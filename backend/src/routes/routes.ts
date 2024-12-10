import express, { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
const router = express.Router();
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { isValidMiddleware } from '../middleware/authMiddleware';
const prisma = new PrismaClient();

// - Implement the following routes:
//   - `/` - Dashboard
//   - `/employees` - Employee List
//   - `/employees/add` - Add New Employee
//   - `/employees/:id` - Employee Details
//   - `/employees/:id/edit` - Edit Employee

const User = z.object({
    name: z.string().min(3).max(100),
    email: z.string().email().min(5).max(100),
    password: z.string()
      .min(5)
      .max(100)
      .regex(/^(?=.*[a-z])(?=.*[A-Z]).*$/, "Password must contain at least one uppercase letter, one lowercase letter"),
});
// @ts-ignore
router.post('/signup', async (req: Request, res: Response) => {
    try {
        const { name, email, password } = User.parse(req.body);

        if (!name || !password || !email) {
            res.status(400).json({
                message: "Please provide all fields!"
            });
            return;
        }
        const findEmail = await prisma.user.findUnique({ where: { email } })

        if(findEmail) {
            res.status(400).json({
                message: "User already exists!"
            });
            return;
        }

        const SALT_ROUND = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
        const hasedPassword = await bcrypt.hash(password, SALT_ROUND);

        await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hasedPassword
            }
        });

        res.status(201).json({
            message: "User registered successfully."
        });
    } catch (error) {
        res.status(500).json({
            message: "Error while registering, please try again."
        });
    }
});

// @ts-ignore
router.post('/signin', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide all fields!"
            });
        }

        const findUser = await prisma.user.findUnique({
            where: {
                email: email,
            }
        });

        const storedHashedPassword = findUser?.password;

        const isPasswordValid = await bcrypt.compare(password, storedHashedPassword as string);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password!"
            });
        }

        const id = findUser?.id;
        const token = jwt.sign({ id }, process.env.JWT_TOKEN as string, { expiresIn: '24h' });

        res.status(200).json({
            message: "Successful signin!",
            token: token
        });
    } catch (error) {
        res.status(500).json({
            message: "Error while signing in, please try again."
        });
    }
});

// add employee details
// @ts-ignore
router.post('/employees/add', isValidMiddleware, async (req: Request, res: Response) => {
    try {
        const { name, department, email } = req.body;
        // Extract user ID from the middleware
        // @ts-ignore
        const userId = req.userid.id;

        // Create an employee
        const addEmployeeDetails = await prisma.employee.create({
            data: {
                name,
                department,
                email,
                userId,
                dateJoined: new Date(),
            },
        });

        res.status(201).json({
            message: "Employee added successfully.",
            empId: addEmployeeDetails.empid,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error while adding employee, please try again."
        });
    }
});

// get all employee
// @ts-ignore
router.get('/dashboard',isValidMiddleware , async(req: Request, res: Response) => {
    try{
        // @ts-ignore
        const { id } = req.userid;

        const empolyeeDetails = await prisma.employee.findMany({
            where: {
                userId: id
            }
        });

        res.status(200).json({
            message: "Dashboard",
            employeeDetails: empolyeeDetails
        });
    }catch (error) {
        res.status(500).json({
            message: "Error while getting employee, please try again."
        });
    }

});

// get employee by id
// @ts-ignore
router.get('/employees/:id',isValidMiddleware , async(req: Request, res: Response) => {
    try{
        // @ts-ignore
        const { id } = req.userid;
        const empid = req.params;

        const empolyeeDetails = await prisma.employee.findUnique({
            where: {
                userId: id,
                empid: parseInt(empid.id)
            }
        });

        res.status(200).json({
            message: "Employee details by id",
            employeeDetails: empolyeeDetails
        });
    }catch (error) {
        res.status(500).json({
            message: "Error while getting employee, please try again."
        });
    }
});

// Route for editing employee details
// @ts-ignore
router.post('/employees/:id/edit', isValidMiddleware, async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const { id } = req.userid;

        if (!id) {
            return res.status(401).json({ message: "Unauthorized access." });
        }

        // Extract and parse employee ID from params
        const empid = parseInt(req.params.id);

        if (isNaN(empid)) {
            return res.status(400).json({ message: "Invalid employee ID." });
        }

        // Extract and validate request body
        const { name, department, email } = req.body;
        if (!name || !department || !email) {
            return res.status(400).json({ message: "All fields are required: name, department, email." });
        }

        // Check if the employee exists for the given user ID and employee ID
        const employeeDetails = await prisma.employee.findFirst({
            where: {
                userId: id,
                empid: empid
            },
        });

        if (!employeeDetails) {
            return res.status(404).json({ message: "Employee not found." });
        }

        // Update the employee details
        const updatedEmployee = await prisma.employee.update({
            where: {
                userId: id,
                empid: empid
            },
            data: {
                name,
                department,
                email,
            },
        });

        res.status(200).json({
            message: "Successfully updated the employee details.",
            employee: updatedEmployee,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error while updating employee details, please try again.",
        });
    }
});

export default router;
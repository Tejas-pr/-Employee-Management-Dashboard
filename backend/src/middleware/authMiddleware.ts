import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        export interface Request {
            userid?: string;
        }
    }
}
const secret = process.env.JWT_TOKEN as string;
export const isValidMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers["authorization"];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: Token not provided" });
        }
        
        const decoded = jwt.verify(token, secret);
        // @ts-ignore
        req.userid = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

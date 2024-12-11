import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useTheme } from "../context/Context";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);
  const [loading, setloading] = React.useState<boolean | null>(false);
  const { theme } = useTheme();
  const empName = React.useRef<HTMLInputElement>(null);
  const empDep = React.useRef<HTMLInputElement>(null);
  const empEmail = React.useRef<HTMLInputElement>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandleClose = async () => {
    setloading(true);
    const currentToken = localStorage.getItem("token");
    const name = empName.current?.value;
    const department = empDep.current?.value;
    const email = empEmail.current?.value;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/v1/employees/add`,
        { name, department, email },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: currentToken || "",
          },
        }
      );
      setloading(false);
      setOpen(false);
      toast(response.data.message);
    } catch (error) {
      console.error("Error adding employee:", error);
      // @ts-ignore
      if (error.response) {
        // @ts-ignore
        toast(error.response.data.message);
      } else {
        alert("An unexpected error occurred.");
      }
      setloading(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        theme={theme ? "dark" : "light"}
        autoClose={3000}
      />
      <React.Fragment>
        <Button
          variant="outlined"
          className="hover:bg-gray-300 hover:text-black"
          onClick={handleClickOpen}
        >
          Add Employee
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          PaperProps={{
            className: `${
              theme === "dark"
                ? "bg-gray-900 text-white"
                : "bg-white text-black"
            } rounded-lg`,
          }}
        >
          <DialogTitle className="font-bold">{"Add Employee"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Enter employee details:
            </DialogContentText>
            <input
              type="text"
              ref={empName}
              placeholder="Employee Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 my-2"
            />
            <input
              type="text"
              ref={empDep}
              placeholder="Employee department"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 my-2"
            />
            <input
              type="text"
              ref={empEmail}
              placeholder="Employee Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 my-2"
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              className={`${
                theme === "dark"
                  ? "text-gray-400 hover:text-blue-400"
                  : "text-gray-800 hover:text-black"
              }`}
            >
              Close
            </Button>
            <Button
              onClick={submitHandleClose}
              className={`${
                theme === "dark"
                  ? "bg-blue-700 text-white"
                  : "bg-blue-500 text-white"
              } hover:bg-blue-600 hover:text-white transition-all`}
            >
              {loading ? <CircularProgress size={15}/> : "Save"}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
}

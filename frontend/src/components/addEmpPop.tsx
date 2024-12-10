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
  const { theme } = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
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
            theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
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
            placeholder="Employee Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 my-2"
          />
          <input
            type="text"
            placeholder="Employee department"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 my-2"
          />
          <input
            type="text"
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
            onClick={handleClose}
            className={`${
              theme === "dark"
                ? "bg-blue-700 text-white"
                : "bg-blue-500 text-white"
            } hover:bg-blue-600 hover:text-white transition-all`}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

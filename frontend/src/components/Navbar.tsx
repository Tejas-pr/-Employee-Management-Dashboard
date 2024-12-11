import { Link } from "react-router-dom";
import CustomizedSwitches from "./toggleSwitch";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import AlertDialogSlide from "./addEmpPop";
import Button from "@mui/material/Button";

const Navbar = () => {
  const [navToggle, setnavToggle] = useState(true);
  const removeToken = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  const currentToken = localStorage.getItem("token");
  return (
    <div>
      <nav className="bg-blue-500 text-white p-3">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="font-bold text-lg">
            Employee Dashboard
          </Link>
          <div className="flex items-center justify-center">
            <div>
              <CustomizedSwitches />
            </div>
            <div className="md:hidden" onClick={() => setnavToggle(!navToggle)}>
              {navToggle ? (
                <div>
                  <FaBars className="cursor-pointer text-2xl" />
                </div>
              ) : (
                <div>
                  <IoCloseOutline className="cursor-pointer text-2xl" />
                </div>
              )}
            </div>
            <div className="hidden md:flex items-center justify-center">
              <Link to="/dashboard" className="mx-4 hover:underline">
                Dashboard
              </Link>
              <Link to="/employees" className="mx-4 hover:underline">
                Employees
              </Link>
              <div className="mx-4 bg-white rounded-lg">
                <AlertDialogSlide />
              </div>
              {!currentToken ? (
                <div className="mx-4 bg-white rounded-lg">
                  <Link to="/signin">
                    <Button variant="contained" disableElevation>
                      Sign In
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="mx-4 bg-white rounded-lg">
                  <Button
                    onClick={removeToken}
                    variant="contained"
                    disableElevation
                  >
                    Log Out
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="relative md:hidden">
        {!navToggle && (
          <div className="absolute right-0 bg-white border border-gray-300 shadow-md mt-2 rounded-lg w-40 dark:bg-slate-300">
            <div className="flex flex-col items-center justify-center gap-1 m-4">
              <div>
                <Link
                  to="/dashboard"
                  className="block px-6 py-3 text-gray-700 hover:bg-blue-500 hover:text-white rounded-t-lg transition duration-200"
                >
                  Dashboard
                </Link>
                <Link
                  to="/employees"
                  className="block px-6 py-3 text-gray-700 hover:bg-blue-500 hover:text-white transition duration-200"
                >
                  Employees
                </Link>
              </div>
              <div>
                <AlertDialogSlide />
              </div>
              {!currentToken ? (
                <div className="mt-2">
                  <Link to="/signin">
                    <Button variant="contained" disableElevation>
                      Sign In
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="mt-2">
                  <Button
                    onClick={removeToken}
                    variant="contained"
                    disableElevation
                  >
                    Log Out
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

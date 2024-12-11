import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const NoAuthScreen = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-500 z-50">
      <div className="p-10 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4 dark:text-black">Please Sign In / Sign Up</h1>
        <p className="text-gray-600 mb-8">
          To access the dashboard, please sign in or sign up.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/signin">
            <Button
              variant="contained"
              disableElevation
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              variant="contained"
              disableElevation
              className="bg-green-500 text-white hover:bg-green-600"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoAuthScreen;

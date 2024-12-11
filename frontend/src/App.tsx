import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import EmployeeList from "./pages/EmployeeList";
import Dashboard from "./pages/Dashboard";
import { useTheme } from "./context/Context";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import LandingPage from "./pages/LandingPage";

const App: React.FC = () => {
  const { theme } = useTheme();
  const location = useLocation();

  const hideNavbarRoutes = ["/", "/signup", "/signin"];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      {showNavbar && <Navbar />}
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

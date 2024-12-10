import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import EmployeeList from './pages/EmployeeList';
import Dashboard from './pages/Dashboard';
import AddEmployee from './pages/AddEmployee';
import EmployeeDetails from './pages/EmployeeDetails';
import EditEmployee from './pages/EditEmployee';
import { useTheme } from './context/Context';

const App: React.FC = () => {
  const { theme } = useTheme();
  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/add" element={<AddEmployee />} />
          <Route path="/employees/:id" element={<EmployeeDetails />} />
          <Route path="/employees/:id/edit" element={<EditEmployee />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

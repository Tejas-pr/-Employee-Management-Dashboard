import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => (
  <nav className="bg-blue-500 text-white p-4">
    <div className="container mx-auto flex justify-between">
      <Link to="/" className="font-bold text-lg">Employee Dashboard</Link>
      <div>
        <Link to="/" className="mx-2">Dashboard</Link>
        <Link to="/employees" className="mx-2">Employees</Link>
        <Link to="/employees/add" className="mx-2">Add Employee</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;

import { useEffect, useState } from 'react';
import { getEmployees } from '../api/employeeApi';
import { data } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getEmployees()
      .then(data => setEmployees(data))
      .catch(err => console.error('Error fetching employees:', err));
      console.log(data)
    }, []);

  return <div>Total Employees: {employees.length}</div>;
};

export default Dashboard;
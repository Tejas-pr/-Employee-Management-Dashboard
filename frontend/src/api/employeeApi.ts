import axios from "axios";

// get all employees
export const getEmployees = async () => {
    const response = await axios.get('/employees');
    return response.data;
};


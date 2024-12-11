import axios from "axios";
import { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import EditEmployee from "../components/EditEmpPop";

interface EmployeeInterface {
  userId: number;
  empid: number;
  name: string;
  department: string;
  email: string;
  dateJoined: string;
}

const EmployeeList = () => {
  const [data, setData] = useState<[] | null>([]);
  const [empID, setEmpId] = useState<Number | null>();

  const allDataHandler = async () => {

    try {
      const currentToken = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/v1/dashboard`,
        {
          headers: {
            authorization: currentToken || "",
          },
        }
      );
      setData(response.data.employeeDetails || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    allDataHandler();
  }, []);

  // const handleRefresh = () => {
  //   allDataHandler();
  // };

  return (
    <div className="flex flex-col items-center justify-center w-full px-4">
      {/* Heading */}
      <div className="grid grid-cols-5 gap-4 w-full p-4 border-b border-gray-300 dark:border-gray-700">
        <div className="text-center font-medium text-gray-900 dark:text-white">
          Emp ID
        </div>
        <div className="text-center font-medium text-gray-900 dark:text-white">
          Emp NAME
          <br />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            EMP EMAIL
          </span>
        </div>
        <div className="text-center font-medium text-gray-900 dark:text-white">
          Dep
        </div>
        <div className="text-center font-medium text-gray-900 dark:text-white">
          Date Joined
        </div>
        <div className="text-center font-medium text-gray-900 dark:text-white">
          Actions
        </div>
      </div>

      {/* Content */}
      <div className="w-full">
        {data?.map((e: EmployeeInterface, index: number) => (
          <div
            key={index}
            className="grid grid-cols-5 gap-4 w-full p-4 items-center border-b border-gray-200 dark:border-gray-700"
          >
            <div className="text-center text-sm font-medium text-gray-900 truncate dark:text-white">
              {e.empid}
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                {e.name}
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                {e.email}
              </p>
            </div>
            <div className="text-center text-sm font-medium text-gray-900 truncate dark:text-white">
              {e.department}
            </div>
            <div className="text-center text-sm font-medium text-gray-900 truncate dark:text-white">
              {new Date(e.dateJoined).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
            <div className="flex justify-center space-x-4">
              <div
                className="p-1 text-gray-900 dark:text-white hover:cursor-pointer"
                onClick={() => setEmpId(e.empid)}
              >
                <EditEmployee empID={empID}/>
              </div>
              <button
                className="p-1 text-gray-900 dark:text-white hover:cursor-pointer"
                onClick={() => console.log(`Delete ID: ${e.empid}`)}
              >
                <RiDeleteBinLine />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;

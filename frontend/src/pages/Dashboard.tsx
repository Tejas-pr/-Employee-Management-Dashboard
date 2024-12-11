import { LineChart } from "@mui/x-charts";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";
import { useEffect, useState } from "react";
import NoAuthScreen from "../components/NoAuthScreen";

const Dashboard = () => {
  const [data, setData] = useState<any[]>([]);
  const [length, setLength] = useState<number | null>(null);
  const [departmentData, setDepartmentData] = useState<{
    [key: string]: number;
  }>({});
  const [joinDateData, setJoinDateData] = useState<{ [key: string]: number }>(
    {}
  );
  const token = localStorage.getItem("token");

  console.log(data);
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

  // Function to calculate department-wise count
  const calculateDepartmentCount = (employees: any[]) => {
    const departmentCounts: { [key: string]: number } = employees.reduce(
      (acc, employee) => {
        const department = employee.department;
        if (acc[department]) {
          acc[department] += 1;
        } else {
          acc[department] = 1;
        }
        return acc;
      },
      {}
    );

    setDepartmentData(departmentCounts);
  };

  // Function to count the number of employees joined on each date
  const calculateJoinDateData = (employees: any[]) => {
    const joinDates: { [key: string]: number } = employees.reduce(
      (acc, employee) => {
        const date = new Date(employee.dateJoined).toLocaleDateString(); // Format the date
        if (acc[date]) {
          acc[date] += 1;
        } else {
          acc[date] = 1;
        }
        return acc;
      },
      {}
    );

    setJoinDateData(joinDates);
  };

  useEffect(() => {
    allDataHandler();
  }, []);

  useEffect(() => {
    if (data.length) {
      setLength(data.length);
      calculateDepartmentCount(data);
      calculateJoinDateData(data);
    }
  }, [data]);

  // Prepare data for the department-wise chart
  const departmentNames = Object.keys(departmentData);
  const departmentCounts = departmentNames.map((name) => departmentData[name]);

  // Prepare data for the recently joined employees chart (line graph)
  const joinDates = Object.keys(joinDateData);
  const joinCounts = joinDates.map((date) => joinDateData[date]);

  return (
    <>
      {!token ? (
        <NoAuthScreen />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
          {/* Total Number of Employees */}
          <div className="col-span-1 flex flex-col items-center justify-center dark:bg-slate-500 dark:rounded-lg">
            <h3 className="font-semibold text-lg m-4">Total Employees</h3>
            <BarChart
              xAxis={[{ scaleType: "band", data: ["Total Employees"] }]}
              series={[{ data: [length ?? 0] }]}
              className="w-[200px] h-[300px]"
              width={200}
              height={500}
            />
          </div>

          {/* Department-Wise Employee Count */}
          <div className="col-span-1 flex flex-col items-center justify-center dark:bg-slate-500 dark:rounded-lg">
            <h3 className="font-semibold text-lg m-4">Department-Wise Count</h3>
            <BarChart
              xAxis={[{ scaleType: "band", data: departmentNames }]}
              series={[{ data: departmentCounts }]}
              width={350}
              height={500}
              className="w-[500px] h-[200px]"
            />
          </div>

          {/* Recently Joined Employees */}
          <div className="col-span-1 flex flex-col items-center justify-center dark:bg-slate-500 dark:rounded-lg">
            <h3 className="font-semibold text-lg m-4">
              Recently Joined Employees
            </h3>
            {joinDates.length < 2 ? (
              <p className="text-gray-500">
                Not enough data to display a line graph.
              </p>
            ) : (
              <LineChart
                xAxis={[{ data: joinDates }]}
                series={[
                  {
                    data: joinCounts,
                  },
                ]}
                width={500}
                height={500}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;

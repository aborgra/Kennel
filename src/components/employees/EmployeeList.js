import React, { useContext } from "react";
import { EmployeeContext } from "./EmployeeProvider";
import Employee from "./Employee";
import "./Employee.css";
import { LocationContext } from "../locations/LocationProvider";

export default props => {
  const { employees } = useContext(EmployeeContext);
  const { locations } = useContext(LocationContext);

  return (
    <div className="employees">
      <h1>Employees</h1>
      <button onClick={() => props.history.push("/employees/create")}>
        {/* says on button click, change the url to /employees/create */}
        Add Employee
      </button>
      <article className="employeeList">
        {employees.map(employee => {
          const location = locations.find(
            location => location.id === employee.locationId
          );

          return (
            <Employee
              key={employee.id}
              employee={employee}
              location={location}
            />
          );
        })}
      </article>
    </div>
  );
};

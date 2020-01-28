import React, { useContext } from "react"
import { EmployeeContext } from "./EmployeeProvider"

export default ({ employee, location, history }) => {
  const { deleteEmployee } = useContext(EmployeeContext)

  return(


    <section className="employee">
        <h3 className="employee__name">{employee.name}</h3>
        <address>
        <div className="employee__location">Location: {location.name}</div>
        </address>
        <button
        onClick={() => {
          deleteEmployee(employee).then(() => {
            history.push("/employees");
          });
        }}
      >
        Delete Employee
      </button>
    </section>
)}
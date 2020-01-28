import React, { useContext, useRef } from "react";
import { EmployeeContext } from "./EmployeeProvider";
import { LocationContext } from "../locations/LocationProvider";
import "./Employee.css"

export default props => {
  const { addEmployee } = useContext(EmployeeContext);
  const { locations } = useContext(LocationContext);
  const employeeName = useRef("");
  const employeeLocation = useRef(0);

  const constructNewEmployee = () => {
    const locationId = parseInt(employeeLocation.current.value);
    // must use the .current.value to get the data stored in the ref variable

    if (locationId === 0) {
      window.alert("Please select a location");
    } else {
      addEmployee({
        name: employeeName.current.value,
        locationId: locationId
      });
    }
  };

  return (
    <form className="employeeForm">
      <h2 className="employeeForm__title">New Employee</h2>
      <div className="form-group">
        <label htmlFor="employeeName">Employee name</label>
        <input
          type="text"
          id="employeeName"
          ref={employeeName}
          required
          autoFocus
          className="form-control"
          placeholder="Employee name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="location">Assign to location</label>
        <select
          defaultValue=""
          name="location"
          ref={employeeLocation}
          id="employeeLocation"
          className="form-control"
        >
          <option value="0">Select a location</option>
          {locations.map(e => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        onClick={event => {
          event.preventDefault(); // Prevent browser from submitting the form
          constructNewEmployee();
          props.history.push("/employees")
        }}
        className="btn btn-primary"
      >
        Save Employee
      </button>{" "}
    </form>
  );
};

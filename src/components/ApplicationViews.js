import React from "react";
import { Route } from "react-router-dom";
import { LocationProvider } from "./locations/LocationProvider";
import { AnimalProvider } from "./animal/AnimalProvider";
import LocationList from "./locations/LocationList";
import AnimalList from "./animal/AnimalList";
import CustomerList from "./customers/CustomerList";
import { CustomerProvider } from "./customers/CustomerProvider";
import { EmployeeProvider } from "./employees/EmployeeProvider";
import EmployeeList from "./employees/EmployeeList";
import EmployeeForm from "./employees/EmployeeForm";
import Login from "./auth/Login";
import AnimalForm from "./animal/AnimalForm";

export default props => {
  return (
    <>
      <LocationProvider>
        {/* Render the location list when http://localhost:3000/ */}
        <Route
          exact
          path="/"
          render={props => {
            // allows us to send the 3 properties of the router to the component(to be able to use the props.history.push on the location list)
            if (localStorage.getItem("kennel_customer") !== null) {
              return <LocationList {...props} />;
              // spread operator(says to send all properties(match, location, history) to the child component)
            }
            return <Login {...props} />;
          }}
        />
      </LocationProvider>

      <AnimalProvider>
        <LocationProvider>
          <CustomerProvider>
            <Route
              exact
              path="/animals"
              render={props => {
                if (localStorage.getItem("kennel_customer") !== null) {
                  return <AnimalList {...props} />;
                }
                return <Login {...props} />;
              }}
            />

            <Route
              exact
              path="/animal/create"
              render={props => <AnimalForm {...props} />}
            />
          </CustomerProvider>
        </LocationProvider>
      </AnimalProvider>

      <CustomerProvider>
        {/* Render the customer list when http://localhost:3000/customers */}
        <Route
          exact
          path="/customers"
          render={props => {
            if (localStorage.getItem("kennel_customer") !== null) {
              return <CustomerList {...props} />;
            }
            return <Login {...props} />;
          }}
        />
      </CustomerProvider>

      <EmployeeProvider>
        <LocationProvider>
          <Route
            exact
            path="/employees"
            render={props => {
              if (localStorage.getItem("kennel_customer") !== null) {
                return <EmployeeList {...props} />;
              }
              return <Login {...props} />;
            }}
          />
          <Route
            exact
            path="/employees/create"
            render={props => <EmployeeForm {...props} />}
          />
        </LocationProvider>
      </EmployeeProvider>
    </>
  );
};

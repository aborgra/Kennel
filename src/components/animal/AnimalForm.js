import React, { useContext, useRef } from "react";
import { AnimalContext } from "./AnimalProvider";
import { LocationContext } from "../locations/LocationProvider";
import "./Animal.css"

export default props => {
  const { addAnimal } = useContext(AnimalContext);
  const { locations } = useContext(LocationContext);
  const AnimalName = useRef("");
  const AnimalLocation = useRef(0);
  const AnimalBreed = useRef("");
  const AnimalOwnerId = parseInt(localStorage.getItem("kennel_customer"))

  const constructNewAnimal = () => {
    const locationId = parseInt(AnimalLocation.current.value);
    // must use the .current.value to get the data stored in the ref variable

    if (locationId === 0) {
      window.alert("Please select a location");
    } else {
      addAnimal({
        name: AnimalName.current.value,
        locationId: locationId,
        breed: AnimalBreed.current.value,
        customerId: AnimalOwnerId
      });
    }
  };

  return (
    <form className="AnimalForm">
      <h2 className="AnimalForm__title">New Animal</h2>
      <div className="form-group">
        <label htmlFor="AnimalName">Animal name</label>
        <input
          type="text"
          id="AnimalName"
          ref={AnimalName}
          required
          autoFocus
          className="form-control"
          placeholder="Animal name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="AnimalBreed">Animal breed</label>
        <input
          type="text"
          id="AnimalBreed"
          ref={AnimalBreed}
          required
          autoFocus
          className="form-control"
          placeholder="Animal breed"
        />
      </div>
      <div className="form-group">
        <label htmlFor="location">Assign to location</label>
        <select
          defaultValue=""
          name="location"
          ref={AnimalLocation}
          id="AnimalLocation"
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
          constructNewAnimal();
          props.history.push("/Animals")
        }}
        className="btn btn-primary"
      >
        Save Animal
      </button>{" "}
    </form>
  );
};

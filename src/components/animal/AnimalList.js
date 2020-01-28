import React, { useContext } from "react";
import { AnimalContext } from "./AnimalProvider";
import { LocationContext } from "../locations/LocationProvider";
import { CustomerContext } from "../customers/CustomerProvider";
import Animal from "./Animal";
import "./Animal.css";

export default props => {
  const { animals } = useContext(AnimalContext);
  const { locations } = useContext(LocationContext);
  const { customers } = useContext(CustomerContext);

  return (
    <div className="animals">
      <button onClick={() => props.history.push("/animal/create")}>
        {/* says on button click, change the url to /employees/create */}
        Add Animal
      </button>

      {animals.map(animal => {
        const owner = customers.find(
          customer => customer.id === animal.customerId
        );
        const clinic = locations.find(
          location => location.id === animal.locationId
        );

        return (
          <Animal
            key={animal.id}
            location={clinic}
            customer={owner}
            animal={animal}
          />
        );
      })}
    </div>
  );
};

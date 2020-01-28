import React, { useContext } from "react";
import { AnimalContext } from "./AnimalProvider";
import { LocationContext } from "../locations/LocationProvider";
import { CustomerContext } from "../customers/CustomerProvider";

export default props => {
  const { animals, deleteAnimal } = useContext(AnimalContext);
  const { locations } = useContext(LocationContext);
  const { customers } = useContext(CustomerContext);

  const chosenAnimalId = parseInt(props.match.params.animalId, 10);

  const animal = animals.find(animal => animal.id === chosenAnimalId) || {};
  const customer =
    customers.find(customer => customer.id === animal.customerId) || {};
  const location =
    locations.find(location => location.id === animal.locationId) || {};
  // need the ||{} for the intial mounting that happens before the component has any data and prevents the variable from returning undefined

  return (
    <section className="animal">
      <div className="animal__owner">Owner: {customer.name}</div>
      <div className="animal__location">Location: {location.name}</div>
      <button
        onClick={() => {
          deleteAnimal(animal).then(() => {
            props.history.push("/animals");
          });
        }}
      >
        Release Animal
      </button>
    </section>
  );
};

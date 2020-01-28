import React, { useContext } from "react";
import { LocationContext } from "../locations/LocationProvider";
import { Link } from "react-router-dom";

export default props => {
  const { locations } = useContext(LocationContext);

  const chosenLocationId = parseInt(props.match.params.locationId, 10);

  const location =
    locations.find(location => location.id === chosenLocationId) || {};

  return (
    <section className="location">
      <h3 className="location__name">{location.name}</h3>
      <div className="location__animals">
        We provide loving care for:  
        {location.animals.map(a => (
          <Link to={`/animals/${a.id}`}>{a.name}{`,  `} </Link>
        ))}
      </div>
      <div className="location__numbers">
        We currently have {location.employees.length} well-trained animal lovers and trainers:
      </div>
      <div className="animal__location">
        
        {location.employees.map(e => (
          <p>{e.name}</p>
        ))}
      </div>
    </section>
  );
};

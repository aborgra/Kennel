import React from "react";
import { Link } from "react-router-dom";

// passes in the location object as an argument
export default ({ location }) => (
  <section className="location">
          <Link to={`/locations/${location.id}`}>{location.name}</Link>
    <address>
      <div className="location__address">{location.address}</div>
    </address>
  </section>
);

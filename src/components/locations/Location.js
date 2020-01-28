import React from "react";

// passes in the location object as an argument
export default ({ location }) => (
  <section className="location">
    <h3 className="location__name">{location.name}</h3>
    <address>
      <div className="location__address">{location.address}</div>
    </address>
  </section>
);

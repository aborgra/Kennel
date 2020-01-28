import React from "react"
import { Link } from "react-router-dom"

export default ({animal}) => (
    <section className="animal">
        <h3 className="animal__name">
          <Link to={`/animals/${animal.id}`}>{animal.name}</Link>
          </h3>
        <div className="animal__breed">Breed: {animal.breed}</div>
        

    </section>
)
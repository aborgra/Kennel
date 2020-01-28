// import the useContext function from react library
import React, { useContext } from "react"
// import the context from the provider
import { LocationContext } from "./LocationProvider"
import Location from "./Location"
import "./Location.css"

export default () => {
  // Hook that allows this component to use the content(locations array) in the context
    const { locations } = useContext(LocationContext)

    return (
        <div className="locations">
        {
          // map over the locations array, for each location object
          // invoking "Location" function with 2 arguments(PK of location and the full location object)
          // name of the first argument is "key", second is "location"

          // locations.map(loc => Locations(loc)) <- vanilla js way
            locations.map(loc => <Location key={loc.id} location={loc} />)
          // single object passed to Location component with 2 properties of key(equal to the id as we set and required by react, we really don't use) and location(which contain an object of the entire location object)
        }
        </div>
    )
}
import React, { useState, useEffect } from "react"

/*
    The context is imported and used by individual components
    that need data (every provider needs a context created)
*/
export const LocationContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const LocationProvider = (props) => {
  // uses the useState hook that defines the container of the context array(locations) and the function that says the name of the function that updates when the state of the context array changes
    const [locations, setLocations] = useState([])


    const getLocations = () => {
        return fetch("http://localhost:8088/locations?_embed=employees&_embed=animals")
            .then(res => res.json())
            .then(setLocations)
            // .then((parsedLocations) => { setLocations (parsedLocations)}) <- what setLocations does in vanilla js
    }

    const addLocation = location => {
        return fetch("http://localhost:8088/locations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(location)
        })
            .then(getLocations)
    }

    /*
        Load all locations when the component is mounted. Only runs on initial load. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        getLocations()
    }, [])

    // runs when the state of the locations array is changed
    useEffect(() => {
        console.log("****  LOCATION APPLICATION STATE CHANGED  ****")
        console.log(locations)
    }, [locations])

    return (
      // when the locationProvider is invoked (on kennel.js)
        <LocationContext.Provider value={{
          // what other components have access to (the array of locations, the function "addLocation")(setLocations(changes state) and getLocations(fetches the array) are only available in this component)
            locations, addLocation
        }}>
       {/* give access of that information to these components (children as stated on kennel.js) */}
            {props.children}
        </LocationContext.Provider>
    )
}
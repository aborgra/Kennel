import React, { useContext, useState, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import { LocationContext } from "../locations/LocationProvider"


export default props => {
    const { locations } = useContext(LocationContext)
    const { addAnimal, animals, updateAnimal } = useContext(AnimalContext)
    const [animal, setAnimal] = useState({})

    const editMode = props.match.params.hasOwnProperty("animalId")
     // true or false, gets the id from the route(seen in address bar)



    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newAnimal = Object.assign({}, animal)
        // never modifies the state object directly, but creates a copy, makes the changes, and replaces the previous
        newAnimal[event.target.name] = event.target.value
        // Targets the name attribute of the changed input which was set to be equal to a key on our object.  Sets the value of that key as the current value of the input field
        setAnimal(newAnimal)
        // saves the state of the animal form with the updated animal object info
    }



    const setDefaults = () => {
        if (editMode) {
            const animalId = parseInt(props.match.params.animalId)
            // gets the id from the route(seen in address bar)
            const selectedAnimal = animals.find(a => a.id === animalId) || {}
            // finds the animal from the animals array that matches the id from the route
            setAnimal(selectedAnimal)
            // updates the state of [animal] with the selected animal object
        }
    }

    useEffect(() => {
        setDefaults()
    }, [animals])
    // [animals] state changes on the provider after initial mounting, which triggers the setDefaults function

    const constructNewAnimal = () => {
        const locationId = parseInt(animal.locationId)

        if (locationId === 0) {
            window.alert("Please select a location")
        } else {
            if (editMode) {
                updateAnimal({
                    id: animal.id,
                    name: animal.name,
                    breed: animal.breed,
                    locationId: locationId,
                    treatment: animal.treatment,
                    customerId: parseInt(localStorage.getItem("kennel_customer"))
                })
                    .then(() => props.history.push("/animals"))
            } else {
                addAnimal({
                    name: animal.name,
                    breed: animal.breed,
                    locationId: locationId,
                    treatment: animal.treatment,
                    customerId: parseInt(localStorage.getItem("kennel_customer"))
                })
                    .then(() => props.history.push("/animals"))
            }
        }
    }

    return (
        <form className="animalForm">
            <h2 className="animalForm__title">{editMode ? "Update Animal" : "Admit Animal"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Animal name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                    // name attribute matches exactly the key on the object
                        proptype="varchar"
                        placeholder="Animal name"
                        defaultValue={animal.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="breed">Animal breed: </label>
                    <input type="text" name="breed" required className="form-control"
                        proptype="varchar"
                        placeholder="Animal breed"
                        defaultValue={animal.breed}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="locationId">Location: </label>
                    <select name="locationId" className="form-control"
                        proptype="int"
                        value={animal.locationId}
                        onChange={handleControlledInputChange}>

                        <option value="0">Select a location</option>
                        {locations.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="treatment">Treatments: </label>
                    <textarea type="text" name="treatment" className="form-control"
                        proptype="varchar"
                        value={animal.treatment}
                        onChange={handleControlledInputChange}>
                    </textarea>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewAnimal()
                }}
                className="btn btn-primary">
                {editMode ? "Save Updates" : "Make Reservation"}
            </button>
        </form>
    )
}
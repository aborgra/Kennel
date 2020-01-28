import React from "react"

export default ({ employee, location }) => (

    <section className="employee">
        <h3 className="employee__name">{employee.name}</h3>
        <address>
        <div className="employee__location">Location: {location.name}</div>
        </address>
    </section>
)
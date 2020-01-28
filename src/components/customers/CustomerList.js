import React, { useContext } from "react"
import { CustomerContext } from "./CustomerProvider"
import Customer from "./Customer"
import "./Customer.css"

export default () => {
    const { customers } = useContext(CustomerContext)

    return (
        <div className="customers">
        {
            customers.map(customer => <Customer key={customer.id} customer={customer} />)
        }
        </div>
    )
}
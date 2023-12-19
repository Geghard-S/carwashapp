import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Agent from "../components/Agent";

const options = [{
    price: 20,
    description: '$20.00 - Express Wash',
}, {
    price: 40,
    description: '$40.00 - Exterior and Interior Vacuum',
}, {
    price: 60,
    description: '$60.00 - Exterior Wash and Interior Vacuum and Dressing',
}, {
    price: 80,
    description: '$80.00 - Exterior Wax, Interior Deep Cleaning',
}];

const Checkout = ({ user }) => {
    // Function to get the current location object from the router
    const location = useLocation();
    // State to track the index of the selected service option
    const [selectedService, setSelectedService] = useState(0);
    // Refs to store references to the PayPal button and the selected service details
    const paypalButtonRef = useRef();
    const selectedReference = useRef();
    // Extract the selected agent from the location state
    const selectedAgent = location.state.agent;
    console.log({ selectedAgent, user })
    // Effect hook to initialize and update the PayPal button
    useEffect(() => {
        if (!paypalButtonRef.current) return;

        paypalButtonRef.current.innerHTML = '';

        window.paypal
            .Buttons({
                // Function to create a PayPal order with transaction details
                createOrder: function (data, actions) {
                    const value = selectedReference.current.price

                    // Set up the transaction details
                    return actions.order.create({
                        purchase_units: [{
                            amount: { value },
                        }],
                    });
                },
                // Function to handle approval after the user completes the PayPal transaction
                onApprove: function (data, actions) {
                    // Capture the funds from the transaction
                    return actions.order.capture().then(function (details) {
                        // Show a success message to the buyer
                        alert(
                            "Transaction completed by " + details.payer.name.given_name
                        );
                    });
                },
            })
            // Render the PayPal button in the specified container
            .render(paypalButtonRef.current);
    }, [paypalButtonRef])

    // Effect hook to update the selected service details when the selectedService state changes
    useEffect(() => {
        selectedReference.current = options[selectedService];
    }, [selectedService])

    // Render method for the Checkout component
    return (
        <div>
            <h1>Checkout</h1>

            <Agent agent={selectedAgent} />

            <div id="serviceSelection" className="service-selection-container">
                {options.map((button, index) => (
                    <button
                        key={index}
                        className={`service-btn${selectedService === index ? ' selected' : ''}`}
                        data-price={button.price}
                        data-description={button.description}
                        onClick={() => setSelectedService(index)}
                    >
                        {button.description}
                    </button>
                ))}
            </div>

            <div className="paypal-center-wrapper">
                <div id="paypal-button-container" ref={paypalButtonRef}></div>
            </div>
        </div>
    );
};

export default Checkout;

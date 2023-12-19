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
    const location = useLocation();
    const [selectedService, setSelectedService] = useState(0);
    
    const paypalButtonRef = useRef();
    const selectedReference = useRef();

    const selectedAgent = location.state.agent;
    console.log({selectedAgent, user})

    useEffect(() => {
        if (!paypalButtonRef.current) return;
        
        paypalButtonRef.current.innerHTML = '';
        
        window.paypal
            .Buttons({
                createOrder: function (data, actions) {
                    const value = selectedReference.current.price

                    // Set up the transaction details
                    return actions.order.create({
                        purchase_units: [{
                            amount: { value },
                        }],
                    });
                },
                onApprove: function (data, actions) {
                    // Capture the funds from the transaction
                    return actions.order.capture().then(function (details) {
                        // Show a success message to the buyer
                        alert(
                            "Transaction completed by " + details.payer.name.given_name
                        );
                        // Handle post-transaction logic here
                    });
                },
            })
            .render(paypalButtonRef.current);
    }, [paypalButtonRef])

    useEffect(() => {
        selectedReference.current = options[selectedService];
    }, [selectedService])

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

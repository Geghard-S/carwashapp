
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../context";
import isValidDate from "./isValidDate";
import useAgents from "../../hooks/useAgents";
import { createDoc } from "../../firebase";

const Appointment = () => {
    // Destructuring user and selectedCar from the context
    const { state: { user, selectedCar } } = useContext(Context);
    const navigate = useNavigate();
    const agents = useAgents();
    // State variables to manage form inputs and state
    const [selectedAgentName, setAgent] = useState();
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [error, setError] = useState();
    const [open, setOpen] = useState(false);

    // If the form is not open, display button to open it
    if (!open) {
        return <button onClick={() => setOpen(true)}>Make an Appointment</button>
    }

    // Handle form submission
    const handleSubmit = event => {
        event.preventDefault();

        // Validate the date
        if (!isValidDate(date)) {
            return setError('Invalid date')
        } else {
            setError(null)
        }

        // Create an appointment document in the 'appointments' collection
        createDoc('appointments', {
            date,
            time,
            agent: selectedAgentName,
            email: user.email,
            car: `${selectedCar.brand} - ${selectedCar.model}`
        });

        // Display an alert and navigate to checkout page with agent information
        alert(`Your appointment with ${selectedAgentName} on ${date} has been sent to ${user.email}`);

        const agent = agents.find(({ name }) => name === selectedAgentName)
        navigate(`/checkout`, { state: { agent } });
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* Date */}
            <div>
                <label>Pick a date</label>{' '}
                <input
                    type="date"
                    value={date}
                    onChange={event => setDate(event.target.value)}
                />
            </div>

            {/* Time */}
            <div>
                <label>Pick a time</label>{' '}
                <input
                    type="time"
                    value={time}
                    onChange={event => setTime(event.target.value)}
                />
            </div>

            {/* Agent */}
            <div>
                <label>Choose an agent</label>{' '}
                <select
                    value={selectedAgentName}
                    onChange={event => setAgent(event.target.value)}
                >
                    <option>-</option>
                    {agents.map(agent => (
                        <option key={agent.name}>{agent.name}</option>
                    ))}
                </select>
            </div>

            {error}

            <button type="submit">Confirm</button>
        </form>
    )
}

export default Appointment

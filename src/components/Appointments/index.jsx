
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../context";
import isValidDate from "./isValidDate";
import useAgents from "../../hooks/useAgents";
import { createDoc } from "../../firebase";

const Appointment = () => {
    const { state: { user, selectedCar } } = useContext(Context);
    const navigate = useNavigate();
    const agents = useAgents();
    const [selectedAgentName, setAgent] = useState();
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [error, setError] = useState();
    const [open, setOpen] = useState(false);

    if (!open) {
        return <button onClick={() => setOpen(true)}>Make an Appointment</button>
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (!isValidDate(date)) {
            return setError('Invalid date')
        } else {
            setError(null)
        }

        createDoc('appointments', {
            date,
            time,
            agent: selectedAgentName,
            email: user.email,
            car: `${selectedCar.brand} - ${selectedCar.model}`
        });

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

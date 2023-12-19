import useAppointments from "../hooks/useAppointments"

const Appointments = () => {
    // Custom hook to fetch and manage appointments data
    const appointments = useAppointments();

    // Render method for the Appointments component
    return (
        <>
            <h1>Appointments</h1>
            <div id="appointmentsSection">
                {appointments.map(appointment => (
                    <div key={appointment.agent} className="result-item appointments">
                        <ul>
                            <li>{appointment.agent}</li>
                            <li>{appointment.date}</li>
                            <li>{appointment.email}</li>
                            <li>{appointment.time}</li>
                        </ul>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Appointments

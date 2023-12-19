import useAppointments from "../hooks/useAppointments"

const Appointments = () => {
    const appointments = useAppointments();

    return (
        <>
            <h1>Appointments</h1>
            <div id="appointmentsSection">
                {appointments.map(appointment => (
                    <div className="result-item appointments">
                        <ul key={appointment.agent}>
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

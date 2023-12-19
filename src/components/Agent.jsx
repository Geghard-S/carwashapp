// Functional component representing an agent
const Agent = ({ agent, onClick = () => {} }) => (
    <div className="result-item" onClick={onClick}>
        <p><strong>{agent.name}</strong></p>
        <p>{agent.address}</p>
        <p>Phone: {agent.phone || '-'}</p>
        <p className="star-rating">{agent.rating || '★★★☆☆'}</p>
    </div>
)

// Export the Agent component
export default Agent;

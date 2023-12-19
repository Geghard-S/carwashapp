import useStore from "./useStore";

// Function that uses the useStore hook to fetch agent-related data
const useAgents = () => useStore('agents');

export default useAgents;



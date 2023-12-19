import useStore from "./useStore";

// Function that uses the useStore hook to fetch appointments-related data
const useAppointments = () => useStore('appointments');

export default useAppointments;

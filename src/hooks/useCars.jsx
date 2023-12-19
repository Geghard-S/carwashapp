import useStore from "./useStore";

// Function that uses the useStore hook to fetch car-related data
const useCars = () => useStore('cars');

export default useCars;

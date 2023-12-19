import { useEffect, useContext } from "react";
import Context from "../context";
import useStore from "../hooks/useStore";

const Cars = () => {
    // Destructuring state and setState from the context
    const { state: { selectedCar }, setState } = useContext(Context)

    // Fetching the list of cars from the store
    const cars = useStore('cars');

    // Function to handle the change in the selected car
    const handleChange = (e) => {
        const selectedIndex = parseInt(e.target.value);
        // Updating the selectedCar in the context state
        setState(state => ({
            ...state,
            selectedCar: cars[selectedIndex] || null
        }))
    };

    // Set the selectedCar to the first car when the component mounts or when the cars list changes
    useEffect(() => setState(state => ({ ...state, selectedCar: cars[0] })), [cars])

    return (
        <>
            <div id="selection">
                <label>Pick a car</label>
                <select onChange={(e) => handleChange(e)} value={selectedCar ? cars.indexOf(selectedCar) : ""}>
                    {cars.map((item, index) => (
                        <option key={index} value={index}>
                            {item.brand}
                        </option>
                    ))}
                </select>
            </div>
            {selectedCar ? (
                <>
                    <div id="carSection">
                        <div id="carInfo">
                            <p>brand: {selectedCar.brand}</p>
                            <p>model: {selectedCar.model}</p>
                            <p>year: {selectedCar.year}</p>
                        </div>
                        <div id="carImage">
                            <img src={selectedCar.url} alt={`${selectedCar.brand} Image`} />
                        </div>
                    </div>
                </>
            ) : (
                // Display a message if no car is selected
                <p>no information</p>
            )}
        </>
    );
};

export default Cars;

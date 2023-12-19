import { useEffect, useContext } from "react";
import Context from "../context";
import useStore from "../hooks/useStore";

const Cars = () => {
    const { state: { selectedCar }, setState } = useContext(Context)

    const cars = useStore('cars');

    const handleChange = (e) => {
        const selectedIndex = parseInt(e.target.value);
        setState(state => ({
            ...state,
            selectedCar: cars[selectedIndex] || null
        }))
    };

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
                <p>no information</p>
            )}
        </>
    );
};

export default Cars;

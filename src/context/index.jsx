import React, { useState } from "react"

// Create a React context
const Context = React.createContext();

// Export the context to be used in other files
export default Context;

// Define a context provider component
export const ContextProvider = ({ children }) => {
    // Use the useState hook to manage the state
    const [state, setState] = useState({
        user: null,
        selectedCar: null
    });

    // Provide the state and setState to the context value
    return (
        <Context.Provider value={{ state, setState }}>
            {children}
        </Context.Provider>
    )
}

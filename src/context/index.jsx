import React, { useState } from "react"

const Context = React.createContext();

export default Context;

export const ContextProvider = ({ children }) => {
    const [state, setState] = useState({
        user: null,
        selectedCar: null
    });

    return (
        <Context.Provider value={{ state, setState }}>
            {children}
        </Context.Provider>
    )
}

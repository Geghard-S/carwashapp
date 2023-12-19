import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from './context/index.jsx';

// Using 'ReactDOM.createRoot' to render the React application into the 'root' element
ReactDOM.createRoot(document.getElementById('root')).render(
  // Wrapping the entire application in 'React.StrictMode' for additional checks and warnings
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

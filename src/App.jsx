import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import { useContext } from 'react'
import Context from "./context";

import UserComponent from './components/User';

// Pages
import Home from './pages/Home';
import FindTechnician from './pages/FindTechnician';
import Appointments from './pages/Appointments';
import Checkout from './pages/Checkout';

// Main 'App' component
function App() {
    
  // Accessing user data from context
  const { state: { user } } = useContext(Context);

  return (
    <div>
      <div>
        <header>
          <img id="logo" src="/logo.png" alt="Logo" />
          <nav>
            <Link to="/">Home</Link>
            <Link to="/find-technician">Agents</Link>
            <Link to="/appointments">Appointments</Link>
          </nav>
          <UserComponent />
        </header>
      </div>
      <main>
        <div id='main' className='flex align-center'>
          <Routes>
            <Route path="/" exact element={user && <Home />} />
            <Route path="/find-technician" element={<FindTechnician />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/checkout" element={<Checkout user={user} />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

// Exporting the 'App' component as the default export
export default App

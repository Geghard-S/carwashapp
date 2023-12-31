import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAgents from "../hooks/useAgents";

import Agent from "../components/Agent";

const FindTechnician = () => {
    const navigate = useNavigate();
    const mapRef = useRef()
    const [map, setMap] = useState();
    const [geoCoder, setGeoCoder] = useState();
    const [zipCode, setZipCode] = useState('');
    const [results, setResults] = useState([]);
    const agents = useAgents()

    // Handle form submission
    const handleSubmit = function (event) {
        event.preventDefault();
        geocodeZipCode(zipCode);
    }

    // Handle input change
    const handleChange = (event) => setZipCode(event.target.value)

    // Display car washes on the map based on the provided zip code
    const displayCarWashes = (zipCode) => {
        // Filter agents based on the last part of the address (zip code)
        const washes = agents.filter(agent => agent.address.split(' ').pop() === zipCode);

        // Set map zoom level
        map.setZoom(11);

        if (!washes) return;

        // Display markers for each car wash
        washes.forEach(wash => {
            const name = wash.name || wash.agents
            const marker = {
                map,
                position: { lat: wash.lat, lng: wash.lng },
                title: name,
                label: {
                    text: name,
                    color: "#000000",
                    fontSize: "12px",
                    fontWeight: "bold"
                }
            }
            new window.google.maps.Marker(marker);
        });

        // Update results state
        setResults(washes)
    }

    // Geocode the provided zip code and display car washes
    const geocodeZipCode = (zipCode) => {
        geoCoder.geocode({ 'address': zipCode }, function (results, status) {
            if (status == 'OK') {
                map.setCenter(results[0].geometry.location);
                displayCarWashes(zipCode);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    const checkout = agent => () => navigate('/checkout', { state: { agent } })

    // Initialize the map and geoCoder on component mount
    useEffect(() => {
        if (!window.google || !mapRef?.current) return;

        const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: 34.0522, lng: -118.2437 },
            zoom: 10,
            styles: [{ featureType: "poi.business", stylers: [{ visibility: "off" }] }]
        });

        setMap(map);
        setGeoCoder(new window.google.maps.Geocoder());
    }, [mapRef])

    // Render the component
    return (
        <div id="MapSection">
            <h1>Find my Technician</h1>
            <form id="searchForm" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={zipCode}
                    onChange={handleChange}
                    placeholder="Enter Zip Code" />
                <button type="submit">Search</button>
            </form>

            <div id="mapContainer">
                <div id="results">
                    {results.map(wash => (
                        <Agent
                            key={wash.name}
                            agent={wash}
                            onClick={checkout(wash)} />
                    ))}
                </div>
                <div id="map" ref={mapRef}></div>
            </div>
        </div>
    )
}

export default FindTechnician;


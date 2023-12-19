import { useState, useEffect } from "react";
import firebase from "../firebase"

// Custom hook to fetch data from a Firestore collection
const useStore = (collection) => {
    // Local state to store the fetched data
    const [data, setData] = useState([]);

    // Effect to fetch data when the component mounts
    useEffect(() => {
        // Function to fetch data asynchronously
        const fetchData = async () => {
            // Access Firestore instance from Firebase
            const db = firebase.firestore();
            try {
                // Get a reference to the specified collection
                const dataRef = db.collection(collection);
                // Get a snapshot of the documents in the collection
                const snapshot = await dataRef.get();
                // Extract data from snapshot documents
                const items = snapshot.docs.map(doc => doc.data());
                setData(items);
            } catch (error) {
                console.log('store error ===', error);
            }
        }

        // Call the fetchData function
        fetchData();
    }, []);

    // Return the fetched data
    return data;
}

export default useStore;

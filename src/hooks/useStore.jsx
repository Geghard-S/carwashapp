import { useState, useEffect } from "react";
import firebase from "../firebase"

const useStore = (collection) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore();
            try {
                const dataRef = db.collection(collection);
                const snapshot = await dataRef.get();
                const items = snapshot.docs.map(doc => doc.data());
                setData(items);
            } catch (error) {
                console.log('store error ===', error);
            }
        }

        fetchData();
    }, []);

    return data;
}

export default useStore;

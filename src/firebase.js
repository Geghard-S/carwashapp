import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUY7HF1mvqavnsF9a8LmQZDFMXMqmmYAQ",
  authDomain: "carwashapp-69d56.firebaseapp.com",
  projectId: "carwashapp-69d56",
  storageBucket: "carwashapp-69d56.appspot.com",
  messagingSenderId: "131317716344",
  appId: "1:131317716344:web:bf8603519fef25e274a48d",
  measurementId: "G-BBSXW9H6WM"
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = getFirestore(app);

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
    // handle user sign in success
    const user = result.user;
    console.log("user sign in ===", user);
  }).catch((error) => {
    console.log("user sign error ===", error);
  })
}

export const signOut = () => {
  firebase.auth().signOut().then(() => {
    console.log('user signout ===');
  }).catch((error) => {
    console.log('user sign out error ===', error);
  })
}

export const createDoc = (coll, doc) => {
  addDoc(collection(db, coll), doc);
}

export default firebase;
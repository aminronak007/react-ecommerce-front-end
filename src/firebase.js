import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCVvgnBi1IWHjUvhSY7pyPiZOpEyAqbyo",
  authDomain: "mernstore-c0823.firebaseapp.com",
  projectId: "mernstore-c0823",
  storageBucket: "mernstore-c0823.appspot.com",
  messagingSenderId: "917264151566",
  appId: "1:917264151566:web:fa43b8f0d7fafefd21f85f",
  measurementId: "G-TB3L4V14PE",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export default firebase;

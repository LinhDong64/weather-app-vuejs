import * as firebase from 'firebase/app'
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_K3EEvVg3l5BHHUF5XA1-UMvgO9Ddgbw",
  authDomain: "weatherappvuejs-c2c17.firebaseapp.com",
  projectId: "weatherappvuejs-c2c17",
  storageBucket: "weatherappvuejs-c2c17.appspot.com",
  messagingSenderId: "537701487410",
  appId: "1:537701487410:web:5957e8b78798869acb7d2b"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export default db;
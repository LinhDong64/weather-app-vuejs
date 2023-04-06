import * as firebase from 'firebase/app'
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIRE_BASE_API_KEY,
  authDomain: process.env.VUE_APP_FIRE_BASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIRE_BASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIRE_BASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIRE_BASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIRE_BASE_APP_ID
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export default db;
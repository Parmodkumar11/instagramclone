// database/firebaseDb.js
import {initializeApp} from "firebase/app"
import {getDatabase} from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyDc76H5KxRAzw80_dOV8i1FPz2hzAe3heI",
  authDomain: "reactnativefirebase-5d9de.firebaseapp.com",
  projectId: "reactnativefirebase-5d9de",
  storageBucket: "reactnativefirebase-5d9de.appspot.com",
  messagingSenderId: "47169722281",
  appId: "1:47169722281:web:74531b92a2f19a81fd56b8"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };

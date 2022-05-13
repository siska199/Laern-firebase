import { initializeApp, getApps, getApp } from "firebase/app"; //Create connection
import { getFirestore } from "firebase/firestore"; //Create connection
import {getStorage} from "firestore/store"
const firebaseConfig = {
  apiKey: "AIzaSyD5HEdkHqRIEKlaufsjH5nvyy-1hKo_K_A",
  authDomain: "learn-crud-e3a6e.firebaseapp.com",
  projectId: "learn-crud-e3a6e",
  storageBucket: "learn-crud-e3a6e.appspot.com",
  messagingSenderId: "763517184492",
  appId: "1:763517184492:web:cc7dcde1e24e3dbbe738c9"
};

const app = getApps.length>0?getApp():initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)
export {app, db, storage}

import { initializeApp } from "firebase/app";
import {getFirestore, collection } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBYQUJh_E4l_h7VY5zIGyojLUUoBw1wfE0",
  authDomain: "filmyduniya-e3d4e.firebaseapp.com",
  projectId: "filmyduniya-e3d4e",
  storageBucket: "filmyduniya-e3d4e.appspot.com",
  messagingSenderId: "920610987449",
  appId: "1:920610987449:web:b6f9578e23eb643bea6a68"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db , 'movies')
export const reviewsRef = collection(db , 'reviews')
export const usersRef = collection(db , 'users')



export default app;
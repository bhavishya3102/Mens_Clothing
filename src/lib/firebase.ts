// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBMUM-aR7XMawraA3TQ5irBL_dZKt9tDsE",
//   authDomain: "varvastra-4a44c.firebaseapp.com",
//   projectId: "varvastra-4a44c",
//   storageBucket: "varvastra-4a44c.firebasestorage.app",
//   messagingSenderId: "918438893014",
//   appId: "1:918438893014:web:fd560cc54c483174960077",
//   measurementId: "G-GP9SZDNJ1K"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);



import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import { getFirestore, collection, addDoc } from "firebase/firestore";

// 🔹 Replace with your actual Firebase config
interface ContactData {
    name: string;
    email: string;
    phone: string;
    message: string;
}
const firebaseConfig = {
apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);

// Function to save contact form data
export const saveContactInfo = async (contactData: ContactData) => {
  try {
    const docRef = await addDoc(collection(db, "contacts"), contactData);
    console.log("Document written with ID:", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document:", error);
    return false;
  }
};


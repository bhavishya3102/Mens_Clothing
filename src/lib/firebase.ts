import { initializeApp } from "firebase/app";
import { addDoc, getFirestore, collection, getDocs } from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

interface ContactData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

if (typeof window !== "undefined") {
  setPersistence(auth, browserLocalPersistence);
}

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

export const getContacts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "contacts"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    return {
      success: true,
      message: "Data fetched successfully",
      data: data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

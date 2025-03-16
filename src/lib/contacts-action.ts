import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

interface ContactData {
  name: string;
  email: string;
  phone: string;
  message: string;
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
    console.error("Error fetching documents:", error);
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

export const deleteContact = async (id: string) => {
  try {
    await deleteDoc(doc(db, "contacts", id));
    console.log("Contact deleted successfully");
  } catch (error) {
    console.log(error)
  }
}



"use server";

import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  inMemoryPersistence,
  setPersistence,
} from "firebase/auth";

export async function login(formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return {
      error: "Email and password are required",
    };
  }

  try {
    await setPersistence(auth, inMemoryPersistence);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const idToken = await userCredential.user.getIdToken();
    return { success: true, idToken };
  } catch (error: any) {
    if (
      error.code === "auth/invalid-credential" ||
      error.code === "auth/user-not-found" ||
      error.code === "auth/wrong-password"
    ) {
      return {
        error: "Invalid email or password",
      };
    }

    if (error.code === "auth/too-many-requests") {
      return {
        error: "Too many failed login attempts. Please try again later.",
      };
    }

    return {
      error: "Something went wrong. Please try again.",
    };
  }
}

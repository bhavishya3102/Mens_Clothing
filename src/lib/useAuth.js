"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useRouter } from "next/navigation";

export function useAuth(requireAuth = false, redirectTo = "/login") {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Current user:", currentUser);
      setUser(currentUser);
      setLoading(false);

      if (requireAuth && !currentUser) {
        console.log("Redirecting to login");
        router.push(redirectTo);
      }
    });

    return () => unsubscribe();
  }, [requireAuth, redirectTo, router]);

  return { user, loading, isAuthenticated: !!user };
}

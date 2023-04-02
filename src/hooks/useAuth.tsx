import { useEffect, useState } from "react";
import { firebaseAuth } from "../config/firebase";
const useAuth = () => {
  const [authData, setAuthData] = useState({ isLoggedIn: false, uid: "" });
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const uid = await user.uid;
        setAuthData({ isLoggedIn: true, uid });
      } else {
        setAuthData({ isLoggedIn: false, uid: "" });
      }
    });
    return unsubscribe;
  }, []);
  return authData;
};

export default useAuth;

import { useEffect, useState } from "react";
import { firebaseAuth } from "../config/firebase";
const useAuth = () => {
  const [authData, setAuthData] = useState({ isLoggedIn: false, uid: "" });
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setAuthData({ isLoggedIn: true, uid: user?.uid });
      }
    });
  }, []);
  return authData;
};

export default useAuth;

import { useEffect, useState } from "react";
import { firebaseAuth } from "../config/firebase";

const useLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    if (firebaseAuth.currentUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return isLoggedIn;
};

export default useLoggedIn;

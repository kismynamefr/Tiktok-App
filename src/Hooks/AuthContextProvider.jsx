import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase-config";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [usersHasSignin, setUsersHasSignin] = useState(false);
  const [serialId, setSerialId] = useState();

  const checkUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setSerialId(uid);
        console.log("uid: ", uid);
        setUsersHasSignin(true);
      } else {
        setUsersHasSignin(false);
        console.log("user not signin");
      }
    });
  };

  useEffect(() => {
    checkUser();
    return () => {};
  }, []);

  return (
    <AuthContext.Provider value={{ usersHasSignin, serialId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

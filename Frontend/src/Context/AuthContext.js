import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { URL } from "../Constants/api";

const AuthContext = createContext([]);

export function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState({});
  const getLoggedIn = async () => {
    try {
      console.log("try in auth");
      let loggedInRes = await axios.get(`${URL}/users/login`, {
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      });
      setLoggedIn(loggedInRes.data);
      console.log("setLogger", loggedInRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

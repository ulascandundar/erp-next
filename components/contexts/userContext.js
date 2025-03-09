"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Favicon from "@/public/favicon.ico";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children, lang }) {
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(Favicon.src);
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    const startFetching = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    };

    startFetching();
  }, [lang, reloadData]);

  const reloadUserData = () => {
    setReloadData(!reloadData);
  };

  const clearUserData = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{ user, profilePicture, reloadUserData, clearUserData }}
    >
      {children}
    </UserContext.Provider>
  );
}

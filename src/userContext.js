import React, { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [IsLoading, setIsLoading] = useState(true);
  const [UserName, setUserName] = useState("");
  const [UserRole, setUserRole] = useState(0);
  

  useEffect(() => {
    setTimeout(() => { setIsLoading(false) }, 150);
  }, []);

  const userContextValue = {
    IsLoggedIn,
    setIsLoggedIn,
    IsLoading,
    UserName,
    setUserName,
    UserRole,
    setUserRole
  };

  return (<UserContext.Provider value={userContextValue}  >
    {children}
  </UserContext.Provider>
  )  //or use (...props)
};

const UseUserContext = () => useContext(UserContext)  //better usage. don't need to import useContext everywhere

export { UserProvider, UseUserContext };
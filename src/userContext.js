import React, { createContext, useState,  useContext } from "react";

const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [User, setUser] = useState({});
  


  const userContextValue = {
    IsLoggedIn,
    setIsLoggedIn,
    User,
    setUser
  };

  return (<UserContext.Provider value={userContextValue}  >
    {children}
  </UserContext.Provider>
  ) 
};

const UseUserContext = () => useContext(UserContext) 

export { UserProvider, UseUserContext };
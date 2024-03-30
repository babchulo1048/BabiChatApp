import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import { io } from "socket.io-client";

const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userID, setUserID] = useState(
    () => localStorage.getItem("userID") || ""
  );
  const [socket, setSocket] = useState(null);

  console.log("userID2:", userID);
  console.log("socket2:", socket);

  useEffect(() => {
    localStorage.setItem("userID", userID);
  }, [userID]);

  useEffect(() => {
    const newSocket = io("http://localhost:8900");
    newSocket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });
    setSocket(newSocket);
  }, []);

  return (
    <userContext.Provider value={{ userID, setUserID, socket }}>
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(userContext);
};

import React, { createContext, useState } from "react";
import axios from "../../../axios";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onLogout = () => {
    setIsLoading(true);
    axios
      .get("/users/logout/" + userId)
      .then(({ data }) => {
        setUserId(null);
        setUsername(null);
        setIsAuthenticated(false);
        setToken(null);
        setError(null);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  };

  const onLogin = async (email, password) => {
    setIsLoading(true);
    const { data } = await axios.post("/users/login", { email, password });
    const status = data.status;
    if (status === "SUCCESS") {
      setIsAuthenticated(true);
      setUserId(data.data.user_id);
      setUsername(data.data.username);
      setToken(data.data.token);
      setIsLoading(false);
      return true;
    } else {
      setError(data.error);
      setIsLoading(false);
      return false;
    }
  };

  const onRegister = async (email, username, password) => {
    setIsLoading(true);
    const { data } = await axios.post("/users/register", {
      email,
      username,
      password,
    });
    const status = data.status;
    if (status === "SUCCESS") {
      setIsAuthenticated(true);
      setUserId(data.data.user_id);
      setUsername(data.data.username);
      setToken(data.data.token);
      setIsLoading(false);
      return true;
    } else {
      setError(data.error);
      setIsLoading(false);
      return false;
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        username,
        isLoading,
        error,
        token,
        userId,
        onLogout,
        onLogin,
        onRegister,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

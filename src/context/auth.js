import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
    role: "",
    _id: "", // Include _id in the state
  });

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth(parseData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = auth?.token;
    localStorage.setItem("auth", JSON.stringify(auth)); // Save auth to localStorage
  }, [auth.token, auth._id]); // Include auth._id in dependencies to save it to localStorage

  const logout = () => {
    setAuth({
      user: null,
      token: "",
      role: "",
      _id: "", // Clear _id on logout
    });

    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };

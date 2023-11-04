import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
    userData: null,
  });

  const navigate = useNavigate();

  const fetchAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const userDataFromToken = jwtDecode(token);
      await axios
        .get(
          `https://neatly-dj6ygctp8-lavalse41.vercel.app/validUser/${userDataFromToken.user_id}`
        )
        .then((result) => {
          setState({
            ...state,
            user: userDataFromToken,
            userData: result.data.data[0],
            loading: false,
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setState({
            ...state,
            loading: false,
            error: "Error fetching user data",
          });
        });
    } else {
      const userDataFromToken = jwtDecode(token);
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        setState({
          ...state,
          user: userDataFromToken,
          userData: JSON.parse(storedUserData),
          loading: false,
        });
      } else {
        setState({
          ...state,
          loading: false,
        });
      }
    }
  };
  useEffect(() => {
    fetchAuth();
  }, []);

  // make a login request
  const login = async (data) => {
    try {
      const result = await axios.post(
        `https://neatly-dj6ygctp8-lavalse41.vercel.app/auth/login`,
        data
      );
      const token = result.data.token;
      const role = result.data.userData.role;
      console.log(token);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      const userData = result.data.userData;
      const userDataFromToken = jwtDecode(token);
      setState({ ...state, user: userDataFromToken, userData: userData });
      if (role === "admin") {
        navigate("/");
        window.location.reload();
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInput");
    localStorage.removeItem("role");
    setState({ ...state, user: null, error: null });
    navigate("/");
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider value={{ state, login, logout, isAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };

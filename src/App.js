import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import JoblyApi from './api';
import AppRoutes from './Routes';
import NavBar from './components/NavBar';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [token, setToken] = useLocalStorage("token", null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      if (token) {
        try {
          const { username } = jwtDecode(token);
          JoblyApi.saveToken(token);
          const user = await JoblyApi.getCurrentUser(username);
          setCurrentUser(user);
        } catch (err) {
          console.error("Error loading user", err);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      setIsLoading(false);
    }

    setIsLoading(true);
    loadUser();
  }, [token]);

  async function login(data) {
    try {
      const token = await JoblyApi.login(data);
      setToken(token);
    } catch (err) {
      console.error("Login failed", err);
    }
  }

  async function signup(data) {
    try {
      const token = await JoblyApi.register(data);
      setToken(token);
    } catch (err) {
      console.error("Signup failed", err);
    }
  }


  function logout() {
    setToken(null);
    setCurrentUser(null);
    navigate("/login");
  }

  async function updateProfile(updatedData) {
    try {
      const updatedUser = await JoblyApi.updateProfile(currentUser.username, updatedData);
      setCurrentUser(updatedUser);
    } catch (err) {
      console.error("Error updating profile", err);
      throw err;
    }
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <NavBar currentUser={currentUser} logout={logout} />
      <AppRoutes
        login={login}
        signup={signup}
        currentUser={currentUser}
        updateProfile={updateProfile}
      />
    </div>
  );
}

export default App;

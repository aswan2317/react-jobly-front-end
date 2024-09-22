import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import JoblyApi from './api';  // Your API helper
import AppRoutes from './Routes';
import NavBar from './components/NavBar';
import useLocalStorage from './hooks/useLocalStorage';  // Custom localStorage hook

function App() {
  const [token, setToken] = useLocalStorage("token");  // Use localStorage for token
  const [currentUser, setCurrentUser] = useState(null);

  // Effect to load current user when token changes
  useEffect(() => {
    async function loadUser() {
      if (token) {
        try {
          console.log("Decoding token:", token);
          const { username } = jwtDecode(token);  // Decode the token to get the username
          JoblyApi.saveToken(token);  // Save the token in JoblyApi
          const user = await JoblyApi.getCurrentUser(username);  // Fetch user info
          console.log("Loaded user:", user);
          setCurrentUser(user);
        } catch (err) {
          console.error("Error loading user", err);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    }
    loadUser();
  }, [token]);

  // Login function
  async function login(data) {
    try {
      const token = await JoblyApi.login(data);
      console.log("Login successful, token:", token);
      setToken(token);  // Save token in localStorage
    } catch (err) {
      console.error("Login failed", err);
    }
  }

  // Signup function
  async function signup(data) {
    try {
      const token = await JoblyApi.register(data);
      console.log("Signup successful, token:", token);
      setToken(token);  // Save token in localStorage
    } catch (err) {
      console.error("Signup failed", err);
    }
  }

  // Logout function
  function logout() {
    console.log("Logging out");
    setCurrentUser(null);
    setToken(null);  // Clear token from localStorage
  }

  // Update Profile function
  async function updateProfile(updatedData) {
    try {
      const updatedUser = await JoblyApi.updateProfile(currentUser.username, updatedData);
      console.log("Profile updated:", updatedUser);
      setCurrentUser(updatedUser);  // Update the user state with the new data
    } catch (err) {
      console.error("Error updating profile", err);
      throw err;
    }
  }

  return (
    <div className="App">
      <NavBar currentUser={currentUser} logout={logout} />  {/* Pass user and logout function */}
      <AppRoutes 
        login={login} 
        signup={signup} 
        currentUser={currentUser} 
        updateProfile={updateProfile}  // Pass updateProfile to routes
      />
    </div>
  );
}

export default App;

// src/App.js
import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
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
          const { username } = jwtDecode(token);  // Decode the token to get the username
          JoblyApi.saveToken(token);  // Save the token in JoblyApi
          const user = await JoblyApi.getCurrentUser(username);  // Fetch user info
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
      setToken(token);  // Save token in localStorage
    } catch (err) {
      console.error("Login failed", err);
    }
  }

  // Signup function
  async function signup(data) {
    try {
      const token = await JoblyApi.register(data);
      setToken(token);  // Save token in localStorage
    } catch (err) {
      console.error("Signup failed", err);
    }
  }// src/App.js
import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
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
          const { username } = jwtDecode(token);  // Decode the token to get the username
          JoblyApi.saveToken(token);  // Save the token in JoblyApi
          const user = await JoblyApi.getCurrentUser(username);  // Fetch user info
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
      setToken(token);  // Save token in localStorage
    } catch (err) {
      console.error("Login failed", err);
    }
  }

  // Signup function
  async function signup(data) {
    try {
      const token = await JoblyApi.register(data);
      setToken(token);  // Save token in localStorage
    } catch (err) {
      console.error("Signup failed", err);
    }
  }

  // Update Profile function
  async function updateProfile(updatedData) {
    try {
      const updatedUser = await JoblyApi.updateProfile(currentUser.username, updatedData);
      setCurrentUser(updatedUser);  // Update the user state with the new data
    } catch (err) {
      throw err;
    }
  }

  // Logout function
  function logout() {
    setCurrentUser(null);
    setToken(null);  // Clear token from localStorage
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


  // Logout function
  function logout() {
    setCurrentUser(null);
    setToken(null);  // Clear token from localStorage
  }

  return (
    <div className="App">
      <NavBar currentUser={currentUser} logout={logout} />  {/* Pass user and logout function */}
      <AppRoutes login={login} signup={signup} currentUser={currentUser} />
    </div>
  );
}

export default App;

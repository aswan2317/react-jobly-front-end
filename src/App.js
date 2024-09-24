import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';  // Correct named export
import JoblyApi from './api';  // Your API helper for backend interactions
import AppRoutes from './Routes';  // Your routes for navigation
import NavBar from './components/NavBar';  // Navigation bar
import useLocalStorage from './hooks/useLocalStorage';  // Custom localStorage hook

function App() {
  const [token, setToken] = useLocalStorage("token", null);  
  const [currentUser, setCurrentUser] = useState(null);  // Store the logged-in user's data
  const [isLoading, setIsLoading] = useState(false);  // Manage loading state

  // Effect to load the current user whenever the token changes
  useEffect(() => {
    async function loadUser() {
      if (token) {
        try {
          const { username } = jwtDecode(token);  // Correct usage of jwtDecode
          JoblyApi.saveToken(token);  // Save token to JoblyApi for API requests
          const user = await JoblyApi.getCurrentUser(username);  // Fetch current user info from backend
          setCurrentUser(user);  // Set user data in state
        } catch (err) {
          console.error("Error loading user", err);
          setCurrentUser(null);  // Reset current user on error
        }
      } else {
        setCurrentUser(null);  // Reset current user if no token
      }
      setIsLoading(false);
    }

    setIsLoading(true);
    loadUser();
  }, [token]);  // Trigger this effect whenever the token changes

  // Login function
  async function login(data) {
    try {
      const token = await JoblyApi.login(data);  // Get token from login API call
      setToken(token);  // Save token in state and localStorage
    } catch (err) {
      console.error("Login failed", err);
    }
  }

  // Signup function
  async function signup(data) {
    try {
      const token = await JoblyApi.register(data);  // Get token from signup API call
      setToken(token);  // Save token in state and localStorage
    } catch (err) {
      console.error("Signup failed", err);
    }
  }

  // Logout function
  function logout() {
    setToken(null);  // Remove token and clear localStorage
    setCurrentUser(null);  // Clear current user data
  }

  // Update Profile function
  async function updateProfile(updatedData) {
    try {
      const updatedUser = await JoblyApi.updateProfile(currentUser.username, updatedData);  // Update user data
      setCurrentUser(updatedUser);  // Update the user state
    } catch (err) {
      console.error("Error updating profile", err);
      throw err;
    }
  }

  if (isLoading) {
    return <p>Loading...</p>;  // Show loading state while fetching data
  }

  return (
    <div className="App">
        <NavBar currentUser={currentUser} logout={logout} />  {/* Pass current user and logout function to NavBar */}
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

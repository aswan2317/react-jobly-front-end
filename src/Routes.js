// src/Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import JobsPage from './components/JobsPage';
import CompanyList from './components/CompanyList';
import CompanyDetail from './components/CompanyDetail';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ProfilePage from './components/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';  // Import the protected route

function AppRoutes({ login, signup, currentUser, updateProfile }) {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/companies" element={<CompanyList />} />
      <Route path="/companies/:handle" element={<CompanyDetail />} />
      <Route path="/login" element={<LoginPage login={login} />} />
      <Route path="/signup" element={<SignupPage signup={signup} />} />
      
      {/* Protect the profile route */}
      <Route path="/profile" element={
        <ProtectedRoute currentUser={currentUser}>
          <ProfilePage currentUser={currentUser} updateProfile={updateProfile} />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default AppRoutes;

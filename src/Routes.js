import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CompaniesPage from './components/CompaniesPage';
import JobsPage from './components/JobsPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ProfilePage from './components/ProfilePage';
import CompanyDetailPage from './components/CompanyDetailPage';

function AppRoutes({ login, signup, currentUser, updateProfile }) {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/companies" element={<CompaniesPage />} />
      <Route exact path="/companies/:handle" element={<CompanyDetailPage />} />
      <Route exact path="/jobs" element={<JobsPage currentUser={currentUser} />} />
      <Route exact path="/login" element={<LoginPage login={login} />} />
      <Route exact path="/signup" element={<SignupPage signup={signup} />} />
      <Route exact path="/profile" element={<ProfilePage currentUser={currentUser} updateProfile={updateProfile} />} />
    </Routes>
  );
}

export default AppRoutes;

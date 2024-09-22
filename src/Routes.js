import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './components/HomePage';
import CompaniesPage from './components/CompaniesPage';
import JobsPage from './components/JobsPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ProfilePage from './components/ProfilePage';  // Create this if it doesn't exist
import CompanyDetailPage from './components/CompanyDetailPage';  // For specific company detail
import PrivateRoute from './components/PrivateRoute';  // For routes requiring login

function AppRoutes({ login, signup, currentUser, updateProfile }) {
  return (
    <Switch>
      {/* Public routes */}
      <Route exact path="/">
        <HomePage />
      </Route>
      
      <Route exact path="/login">
        {currentUser ? <Redirect to="/" /> : <LoginPage login={login} />}
      </Route>

      <Route exact path="/signup">
        {currentUser ? <Redirect to="/" /> : <SignupPage signup={signup} />}
      </Route>

      {/* Private routes - only accessible if logged in */}
      <PrivateRoute exact path="/companies">
        <CompaniesPage />
      </PrivateRoute>

      <PrivateRoute exact path="/companies/:handle">
        <CompanyDetailPage />
      </PrivateRoute>

      <PrivateRoute exact path="/jobs">
        <JobsPage currentUser={currentUser} />
      </PrivateRoute>

      <PrivateRoute exact path="/profile">
        <ProfilePage currentUser={currentUser} updateProfile={updateProfile} />
      </PrivateRoute>

      {/* Fallback redirect for unknown routes */}
      <Redirect to="/" />
    </Switch>
  );
}

export default AppRoutes;

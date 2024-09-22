import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import CompaniesPage from './components/CompaniesPage';
import JobsPage from './components/JobsPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';  // Create if not already made
import ProfilePage from './components/ProfilePage';  // Create if not already made
import CompanyDetailPage from './components/CompanyDetailPage'; 

function AppRoutes({ login, signup, currentUser, updateProfile }) {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/companies">
        <CompaniesPage />
      </Route>
      <Route exact path="/companies/:handle">
        <CompanyDetailPage />
      </Route>
      <Route exact path="/jobs">
        <JobsPage currentUser={currentUser} />
      </Route>
      <Route exact path="/login">
        <LoginPage login={login} />
      </Route>
      <Route exact path="/signup">
        <SignupPage signup={signup} />
      </Route>
      <Route exact path="/profile">
        <ProfilePage currentUser={currentUser} updateProfile={updateProfile} />
      </Route>
    </Switch>
  );
}

export default AppRoutes;

// src/components/ProfilePage.js
import React, { useState } from 'react';

function ProfilePage({ currentUser, updateProfile }) {
  const [formData, setFormData] = useState({
    username: currentUser.username,
    firstName: currentUser.firstName || '',
    lastName: currentUser.lastName || '',
    email: currentUser.email || '',
    password: ''  // Password for verification (if required by backend)
  });
  
  const [saveConfirmed, setSaveConfirmed] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  // Handle form data changes
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(fData => ({ ...fData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await updateProfile(formData);
      setSaveConfirmed(true);  // Show confirmation message
      setFormErrors([]);  // Clear any errors
    } catch (err) {
      setFormErrors(err);
      setSaveConfirmed(false);
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        
        <label htmlFor="password">Confirm Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        
        <button type="submit">Save Changes</button>

        {formErrors.length ? <p>Error: {formErrors.join(', ')}</p> : null}
        {saveConfirmed ? <p>Profile updated successfully!</p> : null}
      </form>
    </div>
  );
}

export default ProfilePage;

import React, { useState } from 'react';

function LoginPage({ login }) {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(fData => ({ ...fData, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    login(formData);  // Use login function passed as a prop
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {/* Add both name and id attributes */}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"  // Add name attribute
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          autoComplete="username"  // Optional: Improve autofill experience
        />
        
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"  // Add name attribute
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          autoComplete="current-password"  // Optional: Improve autofill experience
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;

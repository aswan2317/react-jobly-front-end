import React, { useState } from 'react';

function SignupPage() {
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(fData => ({ ...fData, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();  // Prevent page reload

    try {
      // Replace this with your signup API call
      console.log('Form data submitted:', formData);
      
      // If you're connecting to a real API, you'd call the API here
      // Example (assuming you have a signup function in an api.js file):
      // await signup(formData);
      
      // For now, just logging to the console to ensure it's working
      console.log('Signup success');
    } catch (err) {
      console.error('Signup failed', err);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default SignupPage;

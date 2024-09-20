import React, { useState, useEffect } from 'react';

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const response = await fetch('http://localhost:3001/companies'); // Adjust the URL as necessary
        const data = await response.json();
        setCompanies(data.companies);
      } catch (error) {
        console.error('Error fetching companies:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCompanies();
  }, []);  // This is where the `useEffect` completes, no extra closing `}` here.

  if (loading) {
    return <h1>Loading companies...</h1>;
  }

  return (
    <div>
      <h1>Companies List</h1>
      <ul>
        {companies.map(company => (
          <li key={company.id}>{company.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CompaniesPage;

// src/components/CompanyList.js
import React, { useState, useEffect } from 'react';
import CompanyCard from './CompanyCard';
import JoblyApi from '../api'; // This should point to your API helper

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch companies when the component loads or when searchTerm changes
  useEffect(() => {
    async function fetchCompanies() {
      try {
        const response = await JoblyApi.getCompanies(searchTerm);
        setCompanies(response);
      } catch (err) {
        console.error('Error fetching companies:', err);
      }
    }

    fetchCompanies();
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="CompanyList">
      <div>
        <input
          type="text"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        {companies.map(company => (
          <CompanyCard
            key={company.handle}
            handle={company.handle}
            name={company.name}
            description={company.description}
          />
        ))}
      </div>
    </div>
  );
};

export default CompanyList;

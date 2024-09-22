// src/components/CompaniesDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api';
import CompanyDetail from './CompanyDetail';  // Import the subcomponent

const CompanyDetailPage = () => {
  const { handle } = useParams();  // Get company handle from URL
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function fetchCompany() {
      try {
        const companyData = await JoblyApi.getCompany(handle);  // Fetch company details
        setCompany(companyData);
      } catch (err) {
        console.error('Error fetching company details:', err);
      }
    }

    fetchCompany();
  }, [handle]);

  if (!company) return <p>Loading...</p>;

  return (
    <div className="CompanyDetailPage">
      <CompanyDetail company={company} />  {/* Pass company data to subcomponent */}
    </div>
  );
};

export default CompanyDetailPage;

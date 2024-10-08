// src/components/CompanyDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api';  // API helper
import JobCard from './JobCard';  // Import the JobCard

const CompanyDetail = () => {
  const { handle } = useParams();  // Use the route param for the company handle
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function fetchCompany() {
      try {
        const companyData = await JoblyApi.getCompany(handle);  // Fetch the company details
        setCompany(companyData);
      } catch (err) {
        console.error('Error fetching company details:', err);
      }
    }

    fetchCompany();
  }, [handle]);

  if (!company) return <p>Loading...</p>;

  return (
    <div className="CompanyDetail">
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      <div>
        <h3>Jobs at {company.name}</h3>
        {company.jobs.length ? (
          company.jobs.map(job => (
            <JobCard
              key={job.id}
              title={job.title}
              salary={job.salary}
              equity={job.equity}
            />
          ))
        ) : (
          <p>No jobs available.</p>
        )}
      </div>
    </div>
  );
};

export default CompanyDetail;

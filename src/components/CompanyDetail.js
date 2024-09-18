// src/components/CompanyDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api'; // Make sure this is your API helper
import JobCard from './JobCard'; // Component to display each job

const CompanyDetail = () => {
  const { handle } = useParams(); // Use 'handle' as the route parameter for the company
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function fetchCompany() {
      try {
        const companyData = await JoblyApi.getCompany(handle); // Fetch company using handle
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
            <JobCard key={job.id} job={job} /> // Pass the whole job object to JobCard
          ))
        ) : (
          <p>No jobs available.</p>
        )}
      </div>
    </div>
  );
};

export default CompanyDetail;

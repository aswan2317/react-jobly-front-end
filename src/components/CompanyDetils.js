// src/components/CompanyDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api'; // This should point to your API helper
import JobCard from './JobCard'; // Component to display each job

const CompanyDetail = () => {
  const { companyName } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function fetchCompany() {
      try {
        const companyData = await JoblyApi.getCompany(companyName);
        setCompany(companyData);
      } catch (err) {
        console.error('Error fetching company details:', err);
      }
    }

    fetchCompany();
  }, [companyName]);

  if (!company) return <p>Loading...</p>;

  return (
    <div className="CompanyDetail">
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      <div>
        <h3>Jobs at {company.name}</h3>
        {company.jobs.map(job => (
          <JobCard
            key={job.id}
            title={job.title}
            salary={job.salary}
            equity={job.equity}
          />
        ))}
      </div>
    </div>
  );
};

export default CompanyDetail;

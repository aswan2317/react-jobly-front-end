// src/components/JobsPage.js
import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import JoblyApi from '../api'; // API helper

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch jobs from the backend
  useEffect(() => {
    async function fetchJobs() {
      try {
        const fetchedJobs = await JoblyApi.getJobs(searchTerm);
        setJobs(fetchedJobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    }
    fetchJobs();
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="JobsPage">
      <div>
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        {jobs.length ? jobs.map(job => (
          <JobCard
            key={job.id}
            title={job.title}
            salary={job.salary}
            equity={job.equity}
            companyName={job.companyName}
          />
        )) : <p>No jobs found</p>}
      </div>
    </div>
  );
};

export default JobsPage;

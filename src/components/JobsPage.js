// src/components/JobsPage.js
import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import JoblyApi from '../api';  // API helper

const JobsPage = ({ currentUser }) => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch jobs from the backend
  useEffect(() => {
    async function fetchJobs() {
      setIsLoading(true);
      try {
        const fetchedJobs = await JoblyApi.getJobs(searchTerm);
        setJobs(fetchedJobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setIsLoading(false);
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
      {isLoading ? (
        <p>Loading jobs...</p>
      ) : (
        jobs.map(job => (
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            salary={job.salary}
            equity={job.equity}
            companyName={job.companyName}  // Display the company name, if available
            applied={currentUser && currentUser.jobsApplied.includes(job.id)}  // Check if user applied
          />
        ))
      )}
    </div>
  );
};

export default JobsPage;

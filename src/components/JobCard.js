// src/components/JobCard.js
import React, { useState } from 'react';
import JoblyApi from '../api';  // API helper

const JobCard = ({ id, title, salary, equity, companyName, applied }) => {
  const [hasApplied, setHasApplied] = useState(applied);  // Track if user applied

  const handleApply = async () => {
    try {
      await JoblyApi.applyToJob(id);  // Call API to apply for job
      setHasApplied(true);  // Mark job as applied
    } catch (err) {
      console.error("Job application failed:", err);
    }
  };

  return (
    <div className="JobCard">
      <h4>{title}</h4>
      {companyName && <p>Company: {companyName}</p>}
      <p>Salary: {salary ? `$${salary.toLocaleString()}` : 'N/A'}</p>
      <p>Equity: {equity ? `${(equity * 100).toFixed(2)}%` : 'N/A'}</p>

      {hasApplied ? (
        <button disabled>Applied</button>
      ) : (
        <button onClick={handleApply}>Apply</button>
      )}
    </div>
  );
};

export default JobCard;

// src/components/JobCard.js
import React from 'react';

const JobCard = ({ title, salary, equity, companyName }) => {
  return (
    <div className="JobCard">
      <h4>{title}</h4>
      {companyName && <p>Company: {companyName}</p>}
      <p>Salary: {salary ? `$${salary.toLocaleString()}` : 'N/A'}</p>
      <p>Equity: {equity ? `${(equity * 100).toFixed(2)}%` : 'N/A'}</p>
    </div>
  );
};

export default JobCard;

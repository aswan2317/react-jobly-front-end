// src/components/CompanyCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const CompanyCard = ({ name, description, handle }) => {
  return (
    <div className="CompanyCard">
      <Link to={`/companies/${handle}`}>
        <h2>{name}</h2>
        <p>{description}</p>
      </Link>
    </div>
  );
};

export default CompanyCard;

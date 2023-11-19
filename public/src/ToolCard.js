import React from 'react';
import { Link } from 'react-router-dom';

function ToolCard({ title, description, path }) {
  return (
    <div className="tool-card">
      <Link to={path}>
        <h2>{title}</h2>
        <p>{description}</p>
      </Link>
    </div>
  );
}

export default ToolCard;

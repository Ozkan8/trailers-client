import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    <h1 className="text-center">404 - Not Found!</h1>
    <Link to="/" className="d-block text-center">
      Go Home
    </Link>
  </div>
);

export default NotFound;
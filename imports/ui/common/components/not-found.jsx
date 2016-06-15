import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

const NotFound = () => (
  <div>
    <Helmet title="Not found" />
    <div className="text-xs-center">
      <h1>Not Found!</h1>
      <Link to="/">Back Home</Link>
    </div>
  </div>
);

export default NotFound;

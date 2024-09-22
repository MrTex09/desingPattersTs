import React from 'react';
import { Link } from 'react-router-dom'; 
const NotFound: React.FC = () => {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">
          <button  className="boton">ve a home</button>
        </Link>
    </div>
  );
};

export default NotFound;

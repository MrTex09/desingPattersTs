import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page.</p>
      <div>
        <Link to="/register">
          <button  className="boton">Register</button>
        </Link>
        <Link to="/login">
          <button  className="boton">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

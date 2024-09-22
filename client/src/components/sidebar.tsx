import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import './Sidebar.css'; 

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isAdmin && (
          <>
            <li>
              <Link to="/admin/users">Manage Users</Link>
            </li>
            <li>
              <Link to="/admin/equipments">Manage Equipments</Link>
            </li>
            <li>
              <Link to="/admin/equipments/new">New Equipment</Link>
            </li>
            <li>
              <Link to="/admin/brands/new">Nueva Marca</Link>
            </li>
            <li>
              <Link to="/admin/brands">Marcas</Link>
            </li>
            <li>
              <Link to="/admin/categories/new">Nueva Categoría</Link>
            </li>
            <li>
              <Link to="/admin/categories">Categorías</Link>
            </li>
          </>
        )}
      </ul>
      <button className="boton" onClick={logout}>Logout</button>
    </div>
  );
};

export default Sidebar;

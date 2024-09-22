import React, { useState, useEffect } from 'react';
import { fetchEquipments } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface Equipment {
  id: string;
  name: string;
  status: string;
  location: string;
}

const EquipUserList = () => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadEquipments = async () => {
      try {
        const equipmentsData = await fetchEquipments();
        setEquipments(equipmentsData);
      } catch (error) {
        console.error('Error fetching equipments:', error);
        setError('No se pudo cargar la lista de equipos. Inténtalo de nuevo más tarde.');
      }
    };
    loadEquipments();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Lista de Equipos</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {equipments.length > 0 ? (
          equipments.map((equipment) => (
            <li key={equipment.id}>
              {equipment.name} - {equipment.status} - {equipment.location}
            </li>
          ))
        ) : (
          <p>No hay equipos disponibles.</p>
        )}
      </ul>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default EquipUserList;

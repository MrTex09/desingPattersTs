import React, { useState, useEffect } from 'react';
import { fetchEquipments, deleteEquipment } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface Equipment {
  id: string;
  name: string;
  status: string;
  location: string;
}

const EquipmentList = () => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const loadEquipments = async () => {
      try {
        const equipmentsData = await fetchEquipments();
        setEquipments(equipmentsData);
      } catch (error) {
        console.error('Error fetching equipments:', error);
      }
    };
    loadEquipments();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteEquipment(id);
      setEquipments(equipments.filter((equipment) => equipment.id !== id));
    } catch (error) {
      console.error('Error deleting equipment:', error);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/equipments/edit/${id}`);
  };

  return (
    <div className="container">
      <h2>Lista de Equipos</h2>
      <button onClick={() => navigate('/admin/equipments/new')}>Agregar Equipo</button>
      <ul>
        {equipments.map((equipment) => (
          <li key={equipment.id}>
            {equipment.name} - {equipment.status} - {equipment.location}
            <button onClick={() => handleEdit(equipment.id)}>Editar</button>
            <button onClick={() => handleDelete(equipment.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EquipmentList;

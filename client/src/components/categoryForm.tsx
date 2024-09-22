/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { createCategory } from '../services/api';
import { useNavigate } from 'react-router-dom'; 

const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await createCategory({ name: categoryName, id: '' });
      setCategoryName('');
      navigate('/admin/categories');
    } catch (error) {
      setError('Error creating category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Add a new category"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Category'}
        </button>
      </form>
      {error && <p>{error}</p>}
      <button onClick={() => navigate('/admin/categories')}>View Categories</button>
    </div>
  );
};

export default CategoryForm;

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { createBrand, deleteBrand, getBrands } from '../services/api';
import BrandList from './brandList';


interface Brand {
  id: string;
  name: string;
}

const BrandForm = () => {
  const [brandName, setBrandName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const fetchedBrands = await getBrands();
        setBrands(fetchedBrands);
      } catch (error) {
        console.error('Error fetching brands', error);
      }
    };

    fetchBrands();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createBrand({ name: brandName, id: '' });
      setBrandName('');
      const updatedBrands = await getBrands();
      setBrands(updatedBrands);
    } catch (error) {
      setError('Error creating brand');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      await deleteBrand(id);
      const updatedBrands = await getBrands();
      setBrands(updatedBrands);
    } catch (error) {
      setError('Error deleting brand');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          placeholder="Add a new brand"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Brand'}
        </button>
      </form>
      {error && <p>{error}</p>}
      <BrandList brands={brands} onDelete={handleDelete} />
    </div>
  );
};

export default BrandForm;

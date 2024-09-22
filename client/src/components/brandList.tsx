/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { getBrands } from '../services/api';

interface Brand {
  id: string;
  name: string;
}

interface BrandListProps {
  brands?: Brand[];
  onDelete?: (id: string) => void;
}

const BrandList: React.FC<BrandListProps> = ({ brands: propBrands, onDelete }) => {
  const [brands, setBrands] = useState<Brand[]>(propBrands || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!propBrands) {
      const fetchBrands = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await getBrands();
          setBrands(data);
        } catch (error) {
          setError('Error fetching brands');
        } finally {
          setLoading(false);
        }
      };

      fetchBrands();
    } else {
      setBrands(propBrands);
      setLoading(false);
    }
  }, [propBrands]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Brand List</h2>
      <ul>
        {brands.map((brand) => (
          <li key={brand.id}>
            {brand.name}
            {onDelete && (
              <button onClick={() => onDelete(brand.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandList;

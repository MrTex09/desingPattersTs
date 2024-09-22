import React, { useState, useEffect } from 'react';
import { createEquipment, updateEquipment, getBrands, getCategories, fetchEquipmentById } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

interface Brand {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

const EquipmentForm = () => {
  const [name, setName] = useState<string>('');
  const [status, setStatus] = useState<string>('available');
  const [location, setLocation] = useState<string>('');
  const [purchaseDate, setPurchaseDate] = useState<string>('');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const brandsData = await getBrands();
        const categoriesData = await getCategories();
        setBrands(brandsData);
        setCategories(categoriesData);

        if (id) {
          const equipment = await fetchEquipmentById(id);
          setName(equipment.name);
          setStatus(equipment.status);
          setLocation(equipment.location);
          setPurchaseDate(equipment.purchaseDate);
          setSelectedBrand(equipment.brandId || '');
          setSelectedCategory(equipment.categoryId || '');
        }
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { 
      name, 
      status, 
      location, 
      purchaseDate, 
      brandId: selectedBrand, 
      categoryId: selectedCategory 
    };

    setLoading(true);
    try {
      if (id) {
        await updateEquipment(id, data);
      } else {
        await createEquipment(data);
      }
      navigate('/equipments');
    } catch (error) {
      console.error('Error saving equipment', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>{id ? 'Editar Equipo' : 'Agregar Equipo'}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Estado</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="available">Disponible</option>
              <option value="unavailable">No disponible</option>
            </select>
          </div>
          <div>
            <label>Ubicación</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Fecha de Adquisición</label>
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
            />
          </div>
          <div>
            <label>Marca</label>
            <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} required>
              <option value="">Selecciona una marca</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Categoría</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
        </form>
      )}
    </div>
  );
};

export default EquipmentForm;
import { Request, Response } from 'express';
import { Brand } from '../models/brandModel'; 
// Obtener todas las marcas
export const getAllBrands = async (req: Request, res: Response) => {
  try {
    const brands = await Brand.findAll();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching brands', error });
  }
};

// Obtener una marca por ID
export const getBrandById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const brand = await Brand.findByPk(id);
    if (brand) {
      res.status(200).json(brand);
    } else {
      res.status(404).json({ message: 'Brand not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching brand', error });
  }
};

// Crear una nueva marca
export const createBrand = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const newBrand = await Brand.create({ name });
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ message: 'Error creating brand', error });
  }
};

// Actualizar una marca
export const updateBrand = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const [updated] = await Brand.update({ name }, { where: { id } });
    if (updated) {
      const updatedBrand = await Brand.findByPk(id);
      res.status(200).json(updatedBrand);
    } else {
      res.status(404).json({ message: 'Brand not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating brand', error });
  }
};

// Eliminar una marca
export const deleteBrand = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await Brand.destroy({ where: { id } });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Brand not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting brand', error });
  }
};

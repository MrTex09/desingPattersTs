import { Request, Response } from 'express';
import  {Equipment} from '../models/equipment';  
export const createEquipment = async (req: Request, res: Response) => {
  const { name, brandId, categoryId, status, location, purchaseDate } = req.body;
  try {
    if (!name || !brandId || !categoryId) {
      return res.status(400).json({ message: 'Name, brandId, and categoryId are required' });
    }

    const equipment = await Equipment.create({
      name,
      brandId,
      categoryId,
      status,
      location,
      purchaseDate
    });
    res.status(201).json(equipment);
  } catch (error) {
    console.error('Error creating equipment:', error);
    res.status(500).json({ message: 'Error creating equipment', error });
  }
};

export const getEquipmentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const equipment = await Equipment.findByPk(id);
    if (!equipment) return res.status(404).json({ message: 'Equipment not found' });

    res.json(equipment);
  } catch (error) {
    console.error('Error fetching equipment:', error);
    res.status(500).json({ message: 'Error fetching equipment', error });
  }
};

export const getAllEquipments = async (req: Request, res: Response) => {
  try {
    const equipments = await Equipment.findAll();
    res.json(equipments);
  } catch (error) {
    console.error('Error fetching equipments:', error);
    res.status(500).json({ message: 'Error fetching equipments', error });
  }
};

export const updateEquipment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { brandId, categoryId } = req.body;

  try {
    if (!brandId || !categoryId) {
      return res.status(400).json({ message: 'BrandId and CategoryId are required' });
    }

    const equipment = await Equipment.findByPk(id);
    if (!equipment) return res.status(404).json({ message: 'Equipment not found' });

    await equipment.update(req.body);
    res.json(equipment);
  } catch (error) {
    console.error('Error updating equipment:', error);
    res.status(500).json({ message: 'Error updating equipment', error });
  }
};

export const deleteEquipment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const equipment = await Equipment.findByPk(id);
    if (!equipment) return res.status(404).json({ message: 'Equipment not found' });

    await equipment.destroy();
    res.json({ message: 'Equipment deleted' });
  } catch (error) {
    console.error('Error deleting equipment:', error);
    res.status(500).json({ message: 'Error deleting equipment', error });
  }
};

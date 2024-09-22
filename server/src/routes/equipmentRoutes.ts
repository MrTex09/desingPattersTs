import { Router } from 'express';
import { createEquipment, getAllEquipments, updateEquipment, deleteEquipment, getEquipmentById } from '../controllers/equipmentController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authenticateJWT, createEquipment);
router.get('/', getAllEquipments);
router.get('/:id', getEquipmentById);
router.put('/edit/:id', authenticateJWT, updateEquipment);
router.delete('/:id', authenticateJWT, deleteEquipment);

export default router;

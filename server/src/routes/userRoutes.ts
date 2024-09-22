import { Router, Request, Response } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateUserRole
} from '../controllers/userController';

const router = Router();

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser); 
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Actualización del rol del usuario
router.patch('/users/:id/role', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  // Verificar los tipos de id y role
  if (typeof id !== 'string' || typeof role !== 'string') {
    return res.status(400).json({ message: 'Invalid input' });
  }

  // Validar el rol
  if (!['admin', 'user'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    await updateUserRole(id, role);
    res.status(200).json({ message: 'User role updated successfully' });
  } catch (error) {
    res.status(500).json({ message: `Error updating user role: ${(error as Error).message}` });
  }
});

export default router;

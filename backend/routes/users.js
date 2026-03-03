import express from 'express';
import {
  registerUser,
  loginUser,
  listUsers,
  getUserById,
  updateUser,
} from '../controllers/userController.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes (add auth middleware here when ready)
router.get('/', listUsers);
router.get('/:id', getUserById);
router.patch('/:id', updateUser);

export default router;

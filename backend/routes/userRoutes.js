import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile ,getUserOrders} from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddlewares.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.put('/profileUpdate', authenticate, updateUserProfile);
router.get('/profile', authenticate, getUserProfile);
router.get('/orders', authenticate, getUserOrders);  // Note: plural 'orders' is more RESTful// Fetch user orders
export default router;

import express from 'express';
import { createPayment, getPaymentStatus } from '../controllers/paymentController.js';
import { authenticate } from '../middlewares/authMiddlewares.js';

const router = express.Router();

router.post('/payments', authenticate, createPayment);
router.get('/payments/:id', authenticate, getPaymentStatus);

export default router;

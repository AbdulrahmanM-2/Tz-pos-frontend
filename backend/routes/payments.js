import express from 'express';
import { mpesaPayment } from '../controllers/paymentController.js';
const router = express.Router();
router.post('/mpesa', mpesaPayment);
export default router;

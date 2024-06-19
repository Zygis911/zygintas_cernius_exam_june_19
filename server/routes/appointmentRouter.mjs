import express from 'express';
import dotenv from 'dotenv';

import AuthMiddleware from '../middleware/authMiddleware.mjs';
import appointmentController from '../controllers/appointmentController.mjs';
import { createAppointmentValidationSchema } from '../validators/appointmentValidator.mjs';


dotenv.config();
const router = express.Router();

router.post('/', [AuthMiddleware, createAppointmentValidationSchema], appointmentController.createAppointment);
router.get('/:id', AuthMiddleware, appointmentController.getAppointmentById);

export default router;
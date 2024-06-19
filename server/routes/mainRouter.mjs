import express from 'express';
import userRouter from './userRouter.mjs';
import appointmentRouter from './appointmentRouter.mjs';

const router = express.Router();

router.use('/users', userRouter);
router.use('/appointments', appointmentRouter)

export default router;
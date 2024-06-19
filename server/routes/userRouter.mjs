import express from 'express';
import dotenv from 'dotenv';


import {registerUserValidationSchema, loginValidationSchema, searchUsernameValidationSchema} from '../validators/userValidator.mjs'

import userController from '../controllers/userController.mjs';

import AuthMiddleware from '../middleware/authMiddleware.mjs';




dotenv.config();

const router = express.Router();

router.post('/register', registerUserValidationSchema, userController.createUser);

router.post('/login', loginValidationSchema, userController.login);

router.get('/:id', userController.getUserById);



export default router;
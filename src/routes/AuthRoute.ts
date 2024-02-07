import express from 'express';
import AuthController from '../controllers/AuthController';
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';
import {authMiddleware} from "../middlewares/AuthMiddleware";

const router = express.Router();

const userService = new UserService();
const authService = new AuthService(userService);
const authController = new AuthController(authService, userService);

router.post('/signin', authController.signIn.bind(authController));
router.post('/signup', authController.signUp.bind(authController))
router.post('/change-password', authMiddleware, authController.changePassword.bind(authController))
router.post('/forgot-password', authController.forgotPassword.bind(authController))

export default router;
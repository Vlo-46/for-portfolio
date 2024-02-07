import express from 'express';
import AuthController from '../controllers/AuthController';
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';

const router = express.Router();

const userService = new UserService();
const authService = new AuthService(userService);
const authController = new AuthController(authService, userService);

router.post('/signin', authController.signIn.bind(authController));
router.post('/signup', authController.signUp.bind(authController))

export default router;
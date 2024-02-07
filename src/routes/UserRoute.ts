import express from 'express';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';
import {authMiddleware} from "../middlewares/AuthMiddleware";

const router = express.Router();

const userService = new UserService();
const userController = new UserController(userService);

router.post('/', userController.createUser.bind(userController));
router.get('/', userController.getAllUsers.bind(userController));
router.get('/:id', userController.getUserById.bind(userController));
router.put('/:id', authMiddleware, userController.updateUser.bind(userController));
router.delete('/:id', authMiddleware, userController.deleteUser.bind(userController));

export default router;
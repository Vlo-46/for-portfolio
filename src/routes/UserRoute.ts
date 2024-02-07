import express from 'express';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';
import {authMiddleware} from "../middlewares/AuthMiddleware";
import {CacheUsersMiddleware} from "../middlewares/CacheMiddleware";

const router = express.Router();

const userService = new UserService();
const userController = new UserController(userService);

router.post('/', userController.createUser.bind(userController));
router.get('/', CacheUsersMiddleware, userController.getAllUsers.bind(userController));
router.get('/:id', CacheUsersMiddleware, userController.getUserById.bind(userController));
router.put('/:id', authMiddleware, userController.updateUser.bind(userController));
router.delete('/:id', authMiddleware, userController.deleteUser.bind(userController));

export default router;
import {Request, Response} from 'express';
import UserService from '../services/UserService';
import {CreateUserDTO} from "../dto/UserDTO";

export default class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const userDTO: CreateUserDTO = req.body;
            const user = await this.userService.createUser(userDTO);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json(users);
        } catch (error: any) {
            res.status(500).json({message: error.message});
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.id;
            const user = await this.userService.getUserById(userId);
            if (!user) {
                res.status(404).json({message: 'User not found'});
                return;
            }
            res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({message: error.message});
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.id;
            const updatedUser = req.body;
            const user = await this.userService.updateUser(userId, updatedUser);
            if (!user) {
                res.status(404).json({message: 'User not found'});
                return;
            }
            res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({message: error.message});
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.id;
            const user = await this.userService.deleteUser(userId);
            if (!user) {
                res.status(404).json({message: 'User not found'});
                return;
            }
            res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({message: error.message});
        }
    }
}
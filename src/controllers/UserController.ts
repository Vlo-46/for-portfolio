import {NextFunction, Request, Response} from 'express';
import UserService from '../services/UserService';
import {CreateUserDTO} from "../dto/UserDTO";
import {createErrorResponse, createSuccessResponse} from "../utils/responseUtils";

export default class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userDTO: CreateUserDTO = req.body;
            const user = await this.userService.createUser(userDTO);

            res.status(201).json(createSuccessResponse({user}));
        } catch (error: any) {
            next(error)
        }
    }

    async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json(createSuccessResponse({users}));
        } catch (error: any) {
            next(error)
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.params.id;
            const user = await this.userService.getUserById(userId);
            if (!user) {
                res.status(404).json(createErrorResponse(undefined, "User not found"));
                return;
            }
            res.status(200).json(createSuccessResponse({user}));
        } catch (error: any) {
            next(error)
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.params.id;
            const updatedUser = req.body;
            const user = await this.userService.updateUser(userId, updatedUser);
            if (!user) {
                res.status(404).json(createErrorResponse(undefined, "User not found"));
                return;
            }
            res.status(200).json(createSuccessResponse({user}));
        } catch (error: any) {
            next(error)
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.params.id;
            const user = await this.userService.deleteUser(userId);
            if (!user) {
                res.status(404).json(createErrorResponse(undefined, "User not found"));
                return;
            }
            res.status(200).json(createSuccessResponse({user}));
        } catch (error: any) {
            next(error)
        }
    }
}
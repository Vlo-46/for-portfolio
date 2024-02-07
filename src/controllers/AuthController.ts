import {NextFunction, Request, Response} from 'express';
import UserService from '../services/UserService';
import {AuthUserDTO, CreateUserDTO} from '../dto/UserDTO';
import {comparePasswords} from '../helpers/bcrypt';
import {generateToken} from '../helpers/jwt';
import AuthService from "../services/AuthService";
import {createErrorResponse, createSuccessResponse} from "../utils/responseUtils";

export default class AuthController {
    private userService: UserService;
    private authService: AuthService;

    constructor(authService: AuthService, userService: UserService) {
        this.authService = authService;
        this.userService = userService;
    }

    async signIn(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {email, password}: AuthUserDTO = req.body;

        try {
            const user = await this.userService.getUserBy('email', email);

            if (!user || !(await comparePasswords(password, user.password))) {
                res.status(401).json(createErrorResponse(undefined, "Invalid email or password"));
                return;
            }

            const token = generateToken({userId: user._id, email: user.email});
            res.json(createSuccessResponse({token}));
        } catch (error) {
            next(error)
        }
    }

    async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userDTO: CreateUserDTO = req.body;

        try {
            const candidate = await this.userService.getUserBy('email', userDTO.email);

            if (candidate) {
                res.status(409).json(createErrorResponse(undefined, 'User is exist'));
                return;
            }

            const user = await this.userService.createUser(userDTO)
            res.status(201).json(createSuccessResponse({user}));
        } catch (error) {
            next(error)
        }
    }
}
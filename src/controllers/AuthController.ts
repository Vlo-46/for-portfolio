import {Request, Response} from 'express';
import UserService from '../services/UserService';
import {AuthUserDTO, CreateUserDTO} from '../dto/UserDTO';
import {comparePasswords} from '../helpers/bcrypt';
import {generateToken} from '../helpers/jwt';
import AuthService from "../services/AuthService";

export default class AuthController {
    private userService: UserService;
    private authService: AuthService;

    constructor(authService: AuthService, userService: UserService) {
        this.authService = authService;
        this.userService = userService;
    }

    async signIn(req: Request, res: Response): Promise<void> {
        const {email, password}: AuthUserDTO = req.body;

        try {
            const user = await this.userService.getUserBy('email', email);

            if (!user || !(await comparePasswords(password, user.password))) {
                res.status(401).json({message: 'Invalid email or password'});
                return;
            }

            const token = generateToken({userId: user._id, email: user.email});
            res.json({token});
        } catch (error) {
            res.status(500).json({message: 'Internal server error'});
        }
    }

    async signUp(req: Request, res: Response): Promise<void> {
        const userDTO: CreateUserDTO = req.body;

        try {
            const candidate = await this.userService.getUserBy('email', userDTO.email);

            if (candidate) {
                res.status(409).json({message: 'User is exist'});
                return;
            }

            const user = await this.userService.createUser(userDTO)
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({message: 'Internal server error'});
        }
    }
}
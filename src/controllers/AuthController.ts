import {NextFunction, Request, Response} from 'express';
import UserService from '../services/UserService';
import {AuthUserDTO, ChangeUserPasswordDTO, CreateUserDTO, ForgotUserPasswordDTO} from '../dto/UserDTO';
import {comparePasswords, hashPassword} from '../helpers/bcrypt';
import {generateToken} from '../helpers/jwt';
import AuthService from "../services/AuthService";
import {createErrorResponse, createSuccessResponse} from "../utils/responseUtils";
import {AuthenticatedRequest} from "../middlewares/AuthMiddleware";
import {makePassword} from "../utils/generatePassword";
import {ISendEmail, sendEmail} from "../helpers/sendEmail";

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

    async changePassword(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const {oldPassword, newPassword}: ChangeUserPasswordDTO = req.body;

            const userId = req.user?.userId

            if (!userId) {
                res.status(401).json(createErrorResponse(undefined, "Unauthorized - Missing token"));
                return
            }

            const candidate = await this.userService.getUserBy('_id', userId)

            if (!candidate) {
                res.status(404).json(createErrorResponse(undefined, "User not found"));
                return
            }

            const areSame = await comparePasswords(oldPassword, candidate.password)
            if (!areSame) {
                res.status(401).json(createErrorResponse(undefined, "Invalid password"));
                return
            }

            const newHashedPassword = await hashPassword(newPassword)
            const data = await this.userService.updateUser(userId, {password: newHashedPassword})

            res.status(200).json(createSuccessResponse({user: data}));
        } catch (error) {
            next(error)
        }
    }

    async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {email}: ForgotUserPasswordDTO = req.body;

            const candidate = await this.userService.getUserBy('email', email)

            if (!candidate) {
                res.status(404).json(createErrorResponse(undefined, "User not found"));
                return
            }

            const newPassword = makePassword(20)
            candidate.password = await hashPassword(newPassword)

            const data: ISendEmail = {
                to: email,
                subject: "Request for reset password",
                text: `Your new password is ${newPassword}`
            }
            await sendEmail(data)

            res.status(201).json(createSuccessResponse({}, "Your new password has been sent to your email"));
        } catch (error) {
            next(error)
        }
    }
}
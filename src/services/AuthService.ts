import UserService from './UserService';
import { AuthUserDTO } from '../dto/UserDTO';
import { comparePasswords } from '../helpers/bcrypt';
import { generateToken } from '../helpers/jwt';

class AuthService {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async signIn({ email, password }: AuthUserDTO): Promise<string | null> {
        try {
            const user = await this.userService.getUserBy('email', email);;

            if (!user || !(await comparePasswords(password, user.password))) {
                return null;
            }

            return generateToken({ userId: user._id, email: user.email });
        } catch (error) {
            throw new Error('Internal server error');
        }
    }
}

export default AuthService;
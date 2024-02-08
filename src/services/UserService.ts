import UserModel, { UserDocument } from '../models/User';
import { CreateUserDTO, UpdateUserDTO } from '../dto/UserDTO';
import {hashPassword} from "../helpers/bcrypt";

export default class UserService {
    async createUser(userDTO: CreateUserDTO): Promise<UserDocument> {
        const hashedPassword = await hashPassword(userDTO.password)
        const newUser = {...userDTO, password: hashedPassword}
        return await UserModel.create(newUser);
    }

    async getAllUsers(): Promise<UserDocument[]> {
        return UserModel.find();
    }

    async getUserById(userId: string): Promise<UserDocument | null> {
        return UserModel.findById(userId);
    }

    async updateUser(userId: string, updatedUserDTO: UpdateUserDTO): Promise<UserDocument | null> {
        return UserModel.findByIdAndUpdate(userId, updatedUserDTO, { new: true });
    }

    async deleteUser(userId: string): Promise<UserDocument | null> {
        return UserModel.findByIdAndDelete(userId);
    }

    async getUserBy(target: string, value: string): Promise<UserDocument | null> {
        return UserModel.findOne({[target]: value})
    }
}
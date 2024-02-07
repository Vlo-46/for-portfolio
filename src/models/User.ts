import mongoose, {Document, Model} from 'mongoose';
import {CreateUserDTO} from "../dto/UserDTO";

export interface UserDocument extends Document, CreateUserDTO {
    createdAt: Date
    updatedAt: Date
}

const userSchema = new mongoose.Schema<UserDocument>({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

const UserModel: Model<UserDocument> = mongoose.model('User', userSchema);
export default UserModel;
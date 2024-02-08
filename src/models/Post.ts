import mongoose, {Document, Model, Schema} from 'mongoose';
import {CreatePostDTO} from "../dto/PostDTO";

export interface PostDocument extends Document, CreatePostDTO {
    author: Schema.Types.ObjectId
    createdAt: Date
    updatedAt: Date
}

const postSchema = new Schema<PostDocument>({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    author:  {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date, default: Date.now
    },
    updatedAt: {
        type: Date, default: Date.now
    }
})

const PostModel: Model<PostDocument> = mongoose.model('Post', postSchema);
export default PostModel;
import PostModel, {PostDocument} from "../models/Post";
import {CreatePostDTO} from "../dto/PostDTO";

export default class PostService {
    async createPost(postDTO: CreatePostDTO, author: string): Promise<PostDocument> {
        const newPost = {...postDTO, author}
        return await PostModel.create(newPost);
    }

    async getAllPosts(): Promise<PostDocument[]> {
        return PostModel
            .find()
            .sort({createdAt: -1})
            .select(['-__v'])
            .populate({
                path: 'author',
                select: ['-_id', '-password', '-createdAt', '-updatedAt', '-__v'],
            });
    }

    async getPostById(postId: string): Promise<PostDocument | null> {
        return PostModel
            .findById(postId)
            .select(['-__v'])
            .populate({
                path: 'author',
                select: ['-_id', '-password', '-createdAt', '-updatedAt', '-__v'],
            });
    }

    async updatePost(postId: string, updatedPostDTO: Partial<PostDocument>): Promise<PostDocument | null> {
        return PostModel.findByIdAndUpdate(postId, updatedPostDTO, {new: true});
    }

    async deletePost(postId: string): Promise<PostDocument | null> {
        return PostModel.findByIdAndDelete(postId);
    }

    async getPostBy(target: string, value: string): Promise<PostDocument | null> {
        return PostModel
            .findOne({[target]: value})
            .select(['-__v'])
            .populate({
                path: 'author',
                select: ['-_id', '-password', '-createdAt', '-updatedAt', '-__v'],
            });
    }
}
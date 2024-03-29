import {NextFunction, Request, Response} from 'express';
import {createErrorResponse, createSuccessResponse} from "../utils/responseUtils";
import {CreatePostDTO} from "../dto/PostDTO";
import PostService from "../services/PostService";
import {AuthenticatedRequest} from "../middlewares/AuthMiddleware";
import { uploadImageToGCS } from '../helpers/gcsUpload';

export default class PostController {
    private postService: PostService;

    constructor(postService: PostService) {
        this.postService = postService;
    }

    async createPost(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = (req as AuthenticatedRequest).user?.userId;

            if (!userId) {
                res.status(404).json(createErrorResponse(undefined, "Unauthorized"));
                return
            }

            let postDTO: CreatePostDTO = req.body;

            if (postDTO.image) {
                const imageFile = (req as any).file;
                if (!imageFile) {
                    res.status(400).json(createErrorResponse(undefined, "Something went wrong uploading image"));
                    return;
                }

                const uploadedImage = await uploadImageToGCS(imageFile)

                if (!uploadedImage) {
                    res.status(400).json(createErrorResponse(undefined, "Something went wrong uploading image"));
                    return;
                }
                postDTO = {...postDTO, image: uploadedImage}
            }

            const post = await this.postService.createPost(postDTO, userId);

            res.status(201).json(createSuccessResponse({post}));
        } catch (error: any) {
            next(error)
        }
    }

    async getAllPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const posts = await this.postService.getAllPosts();

            res.status(200).json(createSuccessResponse({posts}));
        } catch (error: any) {
            next(error)
        }
    }

    async getPostById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const postId = req.params.id;
            const post = await this.postService.getPostById(postId);
            if (!post) {
                res.status(404).json(createErrorResponse(undefined, "Post not found"));
                return;
            }

            res.status(200).json(createSuccessResponse({post}));
        } catch (error: any) {
            next(error)
        }
    }

    async updatePost(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const postId = req.params.id;
            const updatedPost = req.body;
            const post = await this.postService.updatePost(postId, updatedPost);
            if (!post) {
                res.status(404).json(createErrorResponse(undefined, "Post not found"));
                return;
            }
            res.status(200).json(createSuccessResponse({post}));
        } catch (error: any) {
            next(error)
        }
    }

    async deletePost(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const postId = req.params.id;
            const post = await this.postService.deletePost(postId);
            if (!post) {
                res.status(404).json(createErrorResponse(undefined, "Post not found"));
                return;
            }
            res.status(200).json(createSuccessResponse({post}));
        } catch (error: any) {
            next(error)
        }
    }
}
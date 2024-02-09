import express from 'express';
import {authMiddleware} from "../middlewares/AuthMiddleware";
import PostService from "../services/PostService";
import PostController from "../controllers/PostController";

const router = express.Router();

const postService = new PostService();
const postController = new PostController(postService);

router.post('/', [authMiddleware], postController.createPost.bind(postController));
router.get('/',  postController.getAllPosts.bind(postController));
router.get('/:id', postController.getPostById.bind(postController));
router.put('/:id', authMiddleware, postController.updatePost.bind(postController));
router.delete('/:id', authMiddleware, postController.deletePost.bind(postController));

export default router;
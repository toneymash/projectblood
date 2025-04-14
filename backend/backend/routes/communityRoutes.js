import express from 'express';
import { getAllCommunityPosts, createCommunityPost } from '../controllers/communityController.js';

const router = express.Router();

router.get('/', getAllCommunityPosts);
router.post('/', createCommunityPost);

export default router;

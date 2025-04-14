import Community from '../models/Community.js';

export const getAllCommunityPosts = async (req, res) => {
  try {
    const posts = await Community.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching community posts', error });
  }
};

export const createCommunityPost = async (req, res) => {
  const { title, description, category } = req.body;
  try {
    const post = await Community.create({ title, description, category });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: 'Error creating post', error });
  }
};

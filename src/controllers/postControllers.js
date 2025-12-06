import { Post, Comment, User } from '../models/index.js';


export const getPosts = async (req, res) => {
try {
const posts = await Post.findAll({
include: [ { model: User, attributes: ['user_id','username'] }, { model: Comment } ],
order: [['createdAt','DESC']]
});
res.json(posts);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Failed to get posts' });
}
};


export const createPost = async (req, res) => {
try {
const post = await Post.create({ ...req.body, user_id: req.user.user_id });
res.status(201).json(post);
} catch (err) {
res.status(400).json({ message: err.message });
}
};


export const getPost = async (req, res) => {
try {
const id = Number(req.params.postId);
if (isNaN(id)) return res.status(400).json({ message: 'Invalid ID' });
const post = await Post.findByPk(id, { include: [ { model: User, attributes: ['user_id','username'] }, { model: Comment } ] });
if (!post) return res.status(404).json({ message: 'Not found' });
res.json(post);
} catch (err) { res.status(500).json({ message: err.message }); }
};


export const deletePost = async (req, res) => {
try {
const post = await Post.findByPk(req.params.id);
if (!post) return res.status(404).json({ message: 'Not found' });
if (post.user_id !== req.user.user_id) return res.status(403).json({ message: 'Not allowed' });
await post.destroy();
res.json({ message: 'Deleted' });
} catch (err) { res.status(500).json({ message: err.message }); }
};
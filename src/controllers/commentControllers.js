import { Comment, Post, User } from '../models/index.js';


export const updateComment = async (req, res) => {
try {
const id = Number(req.params.commentId);
if (isNaN(id)) return res.status(400).json({ message: 'Invalid ID' });
const comment = await Comment.findByPk(id);
if (!comment) return res.status(404).json({ message: 'Not found' });
if (comment.user_id !== req.user.user_id) return res.status(403).json({ message: 'Not allowed' });
comment.content = req.body.content;
await comment.save();
res.json(comment);
} catch (err) { res.status(500).json({ message: err.message }); }
};


export const deleteComment = async (req, res) => {
try {
const id = Number(req.params.commentId);
if (isNaN(id)) return res.status(400).json({ message: 'Invalid ID' });
const comment = await Comment.findByPk(id);
if (!comment) return res.status(404).json({ message: 'Not found' });
if (comment.user_id !== req.user.user_id) return res.status(403).json({ message: 'Not allowed' });
await comment.destroy();
res.json({ message: 'Deleted' });
} catch (err) { res.status(500).json({ message: err.message }); }
};
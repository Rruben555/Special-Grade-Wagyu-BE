// import express from "express";
// import { Comment, Post } from "../models/index.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// --- FITUR AKTIF: CREATE COMMENT ---
// router.post("/:postId", protect, async (req, res) => {
//   try {
//     // 💡 Perbaikan: Konversi postId (dari URL parameter) ke integer
//     const postId = parseInt(req.params.postId, 10);
//     if (isNaN(postId)) {
//         return res.status(400).json({ message: "Invalid Post ID format" });
//     }

//     const post = await Post.findByPk(postId); // Gunakan postId yang sudah di-parse
//     if (!post) return res.status(404).json({ message: "Post not found" });

//       const comment = await Comment.create({
//       content: req.body.content,
//       post_id: post.post_id,
//       user_id: req.user.user_id
//     });
//     res.status(201).json(comment);
//     }catch (err) {
//     res.status(400).json({ error: err.message });
// }
// });



// backend/src/routes/commentRoutes.js
import express from 'express';
import { updateComment, deleteComment } from '../controllers/commentControllers.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.put('/:commentId', protect, updateComment);
router.delete('/:commentId', protect, deleteComment);
export default router;
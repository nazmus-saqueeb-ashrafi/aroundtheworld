//routes/postRoutes.js
const express = require("express");
const router = express.Router();
const {getPosts,
     setPosts,
     updatePost,
     deletePost,
     likePost,
     timelinePosts,
     commentPost,
     deleteComment,
     deleteReply,
     sharePost,

     getComments
    } = require('../controllers/postController')

module.exports = router

const { protect } = require("../middleware/authMiddleware")

//
router.get("/",protect, getPosts);

router.post("/",protect, setPosts);


router.put("/:id",protect, updatePost);

router.delete("/:id",protect, deletePost);

//

router.put("/:id/like",protect, likePost);

router.post("/:id/comment",protect, commentPost);

router.get("/:id/getcomments",protect, getComments);

router.delete("/:id/deletecomment",protect, deleteComment);

router.delete("/:id/deletereply",protect, deleteReply);


router.get("/timeline/all",protect, timelinePosts);

router.post("/:id/share",protect, sharePost);

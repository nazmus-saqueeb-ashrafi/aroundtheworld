//routes/postRoutes.js
const express = require("express");
const router = express.Router();
const {getPosts,setPosts, updatePost,deletePost} = require('../controllers/postController')

module.exports = router

const { protect } = require("../middleware/authMiddleware")

router.get("/",protect, getPosts);

router.post("/",protect, setPosts);


router.put("/:id",protect, updatePost);

router.delete("/:id",protect, deletePost);
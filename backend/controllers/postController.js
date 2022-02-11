const asyncHandler = require('express-async-handler')

const Post = require('../models/postModel')

// @desc    Get posts
// @route   GET /api/posts
// @access  Private
const getPosts = asyncHandler( async(req,res) =>{
    const posts = await Post.find()
    res.status(200).json(posts);
})

// @desc    Set posts
// @route   POST /api/posts
// @access  Private
const setPosts = asyncHandler( async (req,res) =>{

    if (!req.body.title) {
        res.status(400)
        throw new Error('Please add a title field')
    }

    const post = await Post.create({
        title: req.body.title,
        description: req.body.description,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        visitDate: req.body.visitDate,

    })

    res.status(200).json(post);
})

// @desc    Update posts
// @route   PUT /api/posts
// @access  Private
const updatePost = asyncHandler(async(req,res) =>{
    const post = await Post.findById(req.params.id)

    if (!post) {
        res.status(400)
        throw new Error('Post not found')
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedPost);
})

// @desc    Delete posts
// @route   DELETE /api/posts
// @access  Private
const deletePost = asyncHandler(async(req,res) =>{
    const post = await Post.findById(req.params.id)

    if (!post) {
        res.status(400)
        throw new Error('Post not found')
    }

    await post.remove()

    res.status(200).json({id: req.params.id});
})

module.exports= {
    getPosts,
    setPosts,
    updatePost,
    deletePost
}
    

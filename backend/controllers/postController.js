const asyncHandler = require('express-async-handler')

const Post = require('../models/postModel')
const User = require('../models/userModel')
const Comment = require('../models/commentModel')

// @desc    Get posts
// @route   GET /api/posts
// @access  Private
const getPosts = asyncHandler( async(req,res) =>{
    const posts = await Post.find({user:req.user.id})
    res.status(200).json(posts);
})

// @desc    Set posts
// @route   POST /api/posts
// @access  Private
const setPosts = asyncHandler( async (req,res) =>{

    if (!req.body.title) {
        res.status(400)
        throw new Error('Please add a title')
    } else if (!req.body.description) {
        res.status(400)
        throw new Error('Please add a description')
    }else if (!req.body.latitude) {
        res.status(400)
        throw new Error('Please add a latitude')
    }else if (!req.body.longitude) {
        res.status(400)
        throw new Error('Please add a longitude')
    }

    const post = await Post.create({
        title: req.body.title,
        description: req.body.description,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        user: req.user.id

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

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the post user
    if (post.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
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

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the post user
    if (post.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await post.remove()

    res.status(200).json({id: req.params.id});
})

// like/dislike post, comment on post/delete comment, timeline posts

// @desc    Like/dislike posts
// @route   PUT /api/posts/:id/like
// @access  Private
const likePost = asyncHandler(async(req,res) =>{
    try {
        const post = await Post.findById(req.params.id);

        if (!post.likes.includes(req.user.id)) {
            await post.updateOne({ $push: { likes: req.user.id } });
            res.status(200).json("The post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: req.user.id } });
            res.status(200).json("The post has been disliked");
        }

  } catch (err) {

    // res.status(500).json(err);

    res.status(500)
    throw new Error(err)
  }

})

// @desc    comment on post
// @route   POST /api/posts/:id/comment
// @access  Private
const commentPost = asyncHandler(async(req,res) =>{
    try {
        const post = await Post.findById(req.params.id);

        const comment = await Comment.create({
            user: req.user.id,
            post: req.params.id,
            text: req.body.text,
        })

        await post.updateOne({ $push: { 
            comments: comment,
        } });

        res.status(200).json("Comment added to the post");
        
  } catch (err) {

    // res.status(500).json(err);

    res.status(500)
    throw new Error(err)
  }

})

// @desc    delete comment
// @route   PUT /api/posts/:id/deletecomment
// @access  Private
const deleteComment = asyncHandler(async(req,res) =>{
    try {
        const comment = await Comment.findById(req.params.id);

        // console.log(comment)
        const post = await Post.findById(comment.post.toString());

        // Make sure the logged in user matches the user who is OP or commented
        if (post.user.toString() === req.user.id || comment.user.toString()=== req.user.id) {

            comment.remove()
            await post.updateOne({ $pull: { 
                comments: comment._id,
            } });

            res.status(200).json("Comment deleted");

        }else{

            res.status(401)
            throw new Error('User not authorized to delete this comment')

        }


        
        
  } catch (err) {

    // res.status(500).json(err);

    res.status(500)
    throw new Error(err)
  }

})



// @desc    Get all timeline posts
// @route   GET /api/posts/timeline/all
// @access  Private
const timelinePosts = asyncHandler(async(req,res) =>{
    try {
    const currentUser = await User.findById(req.user.id);
    const userPosts = await Post.find({ user: currentUser });

    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ user: friendId });
      })
    );

    res.json(userPosts.concat(...friendPosts))

    } catch (err) {
        res.status(500)
        throw new Error(err)
    }

})

module.exports= {
    getPosts,
    setPosts,
    updatePost,
    deletePost,
    likePost,
    timelinePosts,
    commentPost,
    deleteComment,
}
    

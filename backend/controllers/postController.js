
// @desc    Get posts
// @route   GET /api/posts
// @access  Private
const getPosts = (req,res) =>{
    res.status(200).json({ message: "get post" });
}

// @desc    Set posts
// @route   POST /api/posts
// @access  Private
const setPosts = (req,res) =>{
    res.status(200).json({ message: "set post" });
}

const updatePost = (req,res) =>{
    res.status(200).json({ message: "update post" });
}

const deletePost = (req,res) =>{
    res.status(200).json({ message: "delete post" });
}

module.exports= {
    getPosts,
    setPosts,
    updatePost,
    deletePost
}
    

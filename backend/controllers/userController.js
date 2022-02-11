const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')

// @desc    Get user data
// @route   GET /api/users/me
// @access  Public
const getMe = asyncHandler( async(req,res) =>{
    res.status(200).json({message:"get my data"});
})


// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    res.json({message:"Register user"})
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    res.json({message:"Login user"})

})


module.exports= {
    getMe,
    registerUser,
    loginUser
}
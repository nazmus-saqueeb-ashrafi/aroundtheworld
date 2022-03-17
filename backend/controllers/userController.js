const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const validator = require('validator')
const User = require('../models/userModel')

// @desc    Get user data
// @route   GET /api/users/me
// @access  Public
const getMe = asyncHandler( async(req,res) =>{

    res.status(200).json(req.user)
    
})


// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler( async (req, res) => {

    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if email is valid
    if (!validator.isEmail(email)){
        res.status(400)
        throw new Error('Email is not valid')
    }

    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })


    // If user was created
    if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }


})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body

    // Check if email is valid
    if (!validator.isEmail(email)){
        res.status(400)
        throw new Error('Email is not valid')
    }

    // Check for user email
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

// follow, unfollow users

// @desc    Follow a user
// @route   PUT /api/users/:id/follow
// @access  Private
const followUser = asyncHandler( async (req, res) => {
    if(req.user.id !== req.params.id){
        const user = await User.findById(req.params.id) 
        const currentUser = await User.findById(req.user.id) 

        if (!user.followers.includes(req.user.id)) {
            await user.updateOne({ $push: { followers: req.user.id } });
            await currentUser.updateOne({ $push: { followings: req.params.id } });

            res.status(200).json("User has been followed");
        } else {
            res.status(403).json("You already follow this user");
        }

    }else{
        res.status(400)
        throw new Error('You cannot follow yourself')

    }
})

// @desc    Unfollow a user
// @route   PUT /api/users/:id/unfollow
// @access  Private
const unfollowUser = asyncHandler( async (req, res) => {
    if(req.user.id !== req.params.id){
        const user = await User.findById(req.params.id) 
        const currentUser = await User.findById(req.user.id) 

        if (user.followers.includes(req.user.id)) {
            await user.updateOne({ $pull: { followers: req.user.id } });
            await currentUser.updateOne({ $pull: { followings: req.params.id } });

            res.status(200).json("User has been unfollowed");
        } else {
            res.status(403).json("You are not following this user");
        }

    }else{
        res.status(400)
        throw new Error('You cannot unfollow yourself')

    }
})



module.exports= {
    getMe,
    registerUser,
    loginUser,
    followUser,
    unfollowUser,
}


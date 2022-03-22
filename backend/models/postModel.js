//MongoDb schema
const mongoose = require("mongoose");

const { Schema } = mongoose;

const requiredNumber = {
  type: Number,
  required: [true,'Please add a longitude and latitude'],
};

const PostSchema = new Schema(
  {
    
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    title: {
      type: String,
      // required: [true,'Please add a title'],
    },
    description:{
        type: String,
        required: [true,'Please add a description']
    },
    // comments: String,
    image: [{
      type: String,
    }],
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    latitude: {
      ...requiredNumber, //required
      min: -90,
      max: 90,
    },
    longitude: {
      ...requiredNumber, //required
      min: -180,
      max: 180,
    },
    visitDate: {
      // required: [true,'Please add a visit date'],
      type: Date,
    },
    airline:{
      type: String,
    },

    //
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },

    // Likes ,comments & date of
    likes: {
      type: Array,
      default: [],
    },
    comments: [{
       type: Schema.Types.ObjectId,
       ref: 'Comment'
    }],

    date: {
      type: Date,
      default: Date.now,
    },

    shares:{
      type: Array,
      default: [],
    },

    // a post may or maynot be a shared post
    sharedPost:{
      type: Schema.Types.ObjectId,
      // required: true,
      ref: "Post",
    }

  },
  //---------------------
  {
    timestamps: true,
  }
);

//we registered the model with mongoose
const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
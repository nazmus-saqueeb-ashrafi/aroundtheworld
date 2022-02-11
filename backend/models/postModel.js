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
      required: [true,'Please add a title'],
    },
    description:{
        type: String,
        required: [true,'Please add a description']
    },
    comments: String,
    image: String,
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
      required: [true,'Please add a visit date'],
      type: Date,
    },

    //
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },

    // Likes ,comments & date of
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "users",
        },
      },
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "users",
        },
        text: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        name: {
          type: String,
        },
        avatar: {
          type: String,
        },
      },
    ],

    date: {
      type: Date,
      default: Date.now,
    },

  },
  //---------------------
  {
    timestamps: true,
  }
);

//we registered the model with mongoose
const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
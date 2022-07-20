const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userId: ObjectId,
  username: String,
  message: String,
  likes: Number,
  timestamp: String,
  image: String,
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;

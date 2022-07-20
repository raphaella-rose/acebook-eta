const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      res.render("posts/index", { posts: posts.reverse() });
    });
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },
  Create: (req, res) => {
    const ObjectId = require("mongodb").ObjectId;
    const id = ObjectId(req.session.user._id);
 
  
    const name = req.session.user.name;

    const timePosted = new Date();
    const post = new Post({
      userId: id,
      username: name,
      message: req.body.message,
      likes: 0,
      timestamp: timePosted,
      comments: []
    });

    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
  Delete: (req, res) => {
    const ObjectId = require("mongodb").ObjectId;
    const id = new ObjectId(req.body.id);
    Post.deleteOne({ _id: id }, (err) => {
      if (err) {
        throw err;
      }
      res.redirect("/posts");
    });
  },
  Like: (req, res) => {
    const ObjectId = require("mongodb").ObjectId;
    const id = new ObjectId(req.body.id);
    Post.updateOne({ _id: id }, { $inc: { likes: 1 } }, (err) => {
      if (err) {
        throw err;
      }
      res.redirect("/posts");
    });
  },
  Comment: (req, res) => {
    console.log(req.body)
    const ObjectId = require("mongodb").ObjectId;
    const id = ObjectId(req.body.id);
    
    const comment = req.body.comment;
    console.log(req.body.comment);
    Post.updateOne({ _id: id }, { $push: { comments: comment } }, (err) => {
      if (err) {
        throw err;
      }
      res.redirect("/posts");
    });
  },
};

module.exports = PostsController;

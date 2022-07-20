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
    const username = req.session.user.username;

    const datePosted = new Date().toLocaleDateString("en-GB");
    const timePosted = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const post = new Post({
      userId: id,
      username: username,
      message: req.body.message,
      likes: 0,
      timestamp: `${datePosted} ${timePosted}`,
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
    Post.updateOne({ _id: id }, { $inc: { likes: 1 } }, () => {
      Post.findOne({ _id: id }, (err, post) => {
        if (err) {
          throw err;
        }
        res.json({likes: post.likes})
      });
    });
  },
};

module.exports = PostsController;

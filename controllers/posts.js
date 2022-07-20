const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      res.render("posts/index", {
        posts: posts.reverse(),
        imageUrl: posts.image,
      });
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
      image: "",
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
  Image: (req, res) => {
    res.render("posts/image");
  },
  AddUrl: (req, res) => {
    console.log(req.body);
    const ObjectId = require("mongodb").ObjectId;
    const id = ObjectId(req.body.id);
    console.log(req.body.id);
    const image = req.body.imageUrl;
    console.log(req.body.imageUrl);
    Post.updateOne({ _id: id }, { $set: { image: image } }, (err) => {
      if (err) {
        throw err;
      }
    });
    res.status(201).redirect("/posts");
  },
};

module.exports = PostsController;

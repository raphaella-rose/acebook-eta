const Post = require("../models/post");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

// set up multer to store uploaded images
// set destination details to store images
// set up filename config for stored images
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../uploads");
  },
  filename: (req, file, callback) => {
    const filesArray = file.originalname.split(".");
    const filename = filesArray[0];
    // const fileExtension = filesArray[1];
    callback(null, filename + "-" + Date.now());
  },
});
const upload = multer({ storage: storage }).single("sample_image");

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
  Upload: (req, res) => {
    // upload image into the uploads folder
    upload((req, res, err) => {
      if (err) {
        return res.end(`Error: ${err}`);
      }
      // else {
      //   return res.end("File has uploaded successfully");
      // }
      const ObjectId = require("mongodb").ObjectId;
      const id = ObjectId(req.session.user._id);
      const name = req.session.user.name;
      const timePosted = new Date();

      const newPost = new Post({
        userId: id,
        username: name,
        message: req.body.message,
        likes: 0,
        timestamp: timePosted,
        img: {
          data: fs.readFileSync(path.join("../uploads/" + req.file.filename)),
          contentType: "image/png",
        },
      });
      newPost.save((err) => {
        if (err) {
          throw err;
        }
      });
    });

    res.status(201).redirect("/posts");
  },
};

module.exports = PostsController;

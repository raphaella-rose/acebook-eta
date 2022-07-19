const Post = require("../models/post");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

// set up multer to store uploaded images
// set destination details to store images
// set up filename config for stored images
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../public/uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("undefined");

console.log("hi");

const imageController = {
  Upload: (req, res) => {
    res.render("posts/upload", { flashMessage: req.flash("success", "") });
    console.log("A");
    console.log(req.body);
    console.log("B");
    console.log(req.body.flashMessage);
  },

  AddImage: (req, res) => {
    // // set up multer to store uploaded images
    // // set destination details to store images
    // // set up filename config for stored images
    // const storage = multer.diskStorage({
    //   destination: (req, file, callback) => {
    //     callback(null, "../public/uploads");
    //   },
    //   filename: (req, file, callback) => {
    //     callback(null, file.originalname);
    //   },
    // });

    // const upload = multer({ storage: storage }).single("undefined");

    // create new post and add to the db
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
      image: {
        data: fs.readFileSync(path.join("../uploads" + req.file.filename)),
        contentType: "image/png",
      },
    });
    newPost.save((err) => {
      if (err) {
        throw err;
      }
    });
  },
};
console.log("bye");
module.exports = imageController;

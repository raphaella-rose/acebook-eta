const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");
const ImagesController = require("../controllers/images");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/new", PostsController.New);
router.post("/delete", PostsController.Delete);
router.post("/like", PostsController.Like);
router.get("/upload", ImagesController.Upload);
router.post("/new", ImagesController.AddImage);
module.exports = router;

const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/new", PostsController.New);
router.get("/upload", PostsController.Upload);
router.post("/delete", PostsController.Delete);
router.post("/like", PostsController.Like);

module.exports = router;

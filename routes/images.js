const express = require("express");
const router = express.Router();

const ImagesController = require("../controllers/images");

router.get("/upload", ImagesController.Upload);
router.post("/new", ImagesController.AddImage);
module.exports = router;

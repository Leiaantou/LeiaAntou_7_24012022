const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comment");
const multer = require("../middleware/multer-config");

router.get("/", commentCtrl.getAllComments);
router.post("/", auth, multer.posts, commentCtrl.createComment);
router.put("/:id", auth, multer.posts, commentCtrl.modifyComment);
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;

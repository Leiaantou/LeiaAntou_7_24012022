const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

router.put("/update/:id", auth, multer.users, userCtrl.modifyUser);
router.delete("/delete/:id", auth, userCtrl.deleteUser);

router.get("/", auth, userCtrl.getAllUsers);
module.exports = router;

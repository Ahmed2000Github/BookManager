const express = require("express");
const router = express.Router();
const _multer = require("../middlewares/uploadeImage");
const adminController = require("../controllers/authController");

// router.get("/login", adminController.getAllLivre);
router.post("/signup", adminController.signup);
router.post("/signin", adminController.signin);
// router.get("/livre/:id", adminController);

module.exports = router;

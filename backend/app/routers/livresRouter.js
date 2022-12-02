const express = require("express");
const router = express.Router();
const _multer = require("../middlewares/uploadeImage");
const checkAuth = require("../middlewares/checkAuth");
const livreController = require("../controllers/livreController");

router.get("/livres", livreController.getAllLivre);
router.post(
  "/livre",
  checkAuth,
  _multer.upload.single("couverture"),
  livreController.addLivre
);
router.get("/livre/:id", livreController.getLivre);
router.post("/livre/feedback", livreController.addFeedback);
router.put(
  "/livre/:id",
  checkAuth,
  _multer.upload.single("couverture"),
  livreController.updateLivre
);
router.post("/livres", livreController.searchLivre);
router.delete("/livre/:id", checkAuth, livreController.deleteLivre);

module.exports = router;

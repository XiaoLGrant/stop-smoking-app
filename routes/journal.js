const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const journalController = require("../controllers/journal");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/journal", journalController.getJournal);;

//router.post("/createPost", upload.single("file"), postsController.createPost);

//router.put("/likePost/:id", postsController.likePost);

//router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;

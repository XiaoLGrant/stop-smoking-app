const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const journalController = require("../controllers/journal");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now

router.post("/createJournal", journalController.createJournal);


module.exports = router;

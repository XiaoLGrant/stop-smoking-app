const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const journalController = require("../controllers/journal");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const passwordResetController = require('../controllers/passwordReset')

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/about", homeController.getAbout);
router.get("/profile", ensureAuth, journalController.getProfile);
router.get("/journal", journalController.getJournal);
router.get("/relax", homeController.getAnxietyReduce);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

router.get('/recover', passwordResetController.getPasswordRecover)
router.post('/recover', passwordResetController.postPasswordRecover)
router.get('/reset/:token', passwordResetController.getPasswordReset)
router.post('/reset/:token', passwordResetController.postPasswordReset)

module.exports = router;

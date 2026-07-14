const express = require('express');
const router = express.Router();
const {signupForm,signup,loginForm,login,logout} = require('../controllers/users');
const passport = require('passport');



router.get("/signup",signupForm);
router.post("/signup",signup);
router.get("/login",loginForm);
router.post("/login",passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: "Invalid username or password",
  }),login);

router.get("/logout",logout);

module.exports = router;
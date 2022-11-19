const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");
const Streak = require("../models/Streak");

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("login", {
    title: "Login",
  });
};

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("signup", {
    title: "Create Account",
  });
};

exports.postSignup = (req, res, next) => {

  console.log(req.body);
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    userName: req.body.userName,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    dailyCigarettes: req.body.numberOfCigs,
    dailyCost: req.body.amountSpent,
    triggers: req.body.triggers,
  });

  console.log('userDoc:', user);

  let startDate = null;
  let streak = 0;
  //determine if there is a streak to track
  let isStreak = req.body.smokingStatus === 'stoppedBefore' || req.body.smokingStatus === 'stoppedToday'
  if (req.body.smokingStatus === 'stoppedBefore') {
    //find current streak in milliseconds
    let currentStreak = Date.now() - new Date(req.body.stoppedSmokingDate);
    //convert to streak in days
    let streakInDays = parseInt(currentStreak / (24 * 60 * 60 * 1000));
    //add start date
    startDate = new Date(req.body.stoppedSmokingDate);
    //add streak
    streak = streakInDays;
  }
  else if (req.body.smokingStatus === 'stoppedToday') {
    //set streak start date to today
    startDate = new Date(Date.now())
  }
  
  //create new streak tracking documnet for user
  const newStreak = new Streak({
    userId: user._id,
    startDate: startDate,
    endDate: null,
    streak: streak,
    isCurrentStreak: isStreak,
  })
  
  console.log('streakDoc:', newStreak);

  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../signup");
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        newStreak.save().catch(err => next(err) )
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/profile");
        });
      });
    }
  );
};

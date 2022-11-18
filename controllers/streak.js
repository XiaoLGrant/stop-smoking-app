const Post = require("../models/Post");
const Streak = require("../models/Streak")
const Journal = require("../models/Journal")
const User = require("../models/User")

module.exports = {
  getStreak: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      const userStreak = await Streak.find({ userId: req.user.id })
      console.log(typeof userStreak)
      // determine durantion of streak match benefit day
      const streak = 1 // TO BE CHANGED TO req.body.streak
      let todayMsg = benefits[benefitDay(streak)]
      res.render("profile.ejs", { posts: posts, user: req.user, message: todayMsg, streak: userStreak });
    } catch (err) {
      console.log(err);
    }
  }
}
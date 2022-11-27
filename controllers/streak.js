const Streak = require("../models/Streak")
const Journal = require("../models/Journal")
const User = require("../models/User")

module.exports = {
  updateStreak: async (user) => {
    try {

      console.log(user)
      console.log('it worked!')
      //check if method was called from journal entry
          //check if user entered yes to smoking
            //if yes - reset streak
      
      const userStreak = await Streak.find({ userId: user._id })
      // if there is a current streak update streak based on current day
      if (userStreak[0].isCurrentStreak) {
        //find current streak in milliseconds
        let currentStreak = Date.now() - userStreak[0].startDate;
        //convert to streak in days
        let streakInDays = parseInt(currentStreak / (24 * 60 * 60 * 1000));
         //update streak in doc
         await Streak.findOneAndUpdate({userId: user._id },
          {streak: streakInDays})

      }
     

      // res.send('It worked!')

    } catch (err) {
      console.log(err);
    }
  }
}
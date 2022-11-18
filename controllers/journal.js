
const Journal = require("../models/Journal");

module.exports = {

  getJournal: (req, res) => {
    res.render("journal.ejs");
  },
 
};

module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },

  getAbout: (req, res) => {
    res.render("about.ejs");
  },
  getAnxietyReduce: async (req, res) => {
    try {
      res.render("games.ejs")
    } catch (err) {
      console.log(err)
    }
  },
};

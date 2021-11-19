module.exports = {
  renderRegisterPage: function (req, res) {
    var id = false;
    if (req.session.userId) {
      id = req.session.userId;
    }
    res.render('register', {
      title: 'Register page',
      userid: id,
    });
  },

  renderLoginPage: function (req, res) {
    var id = false;
    if (req.session.userId) {
      id = req.session.userId;
    }
    res.render('login', {
      title: 'Login page',
      userid: id,
    });
  },
};

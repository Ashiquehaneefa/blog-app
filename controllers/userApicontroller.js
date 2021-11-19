var User = require('../models/user');

module.exports = {
  registerUser: async (req, res) => {
    try {
      var user = new User({ ...req.body });
      await user.save();
      req.session.userId = user._id;
      req.session.userName = user.name;
      res.redirect('/');
    } catch (err) {
      console.log(err);
      if (err.name === 'ValidationError')
        return res.status(400).send('Validation Error');
      else return res.status(500).send('Server Error');
    }
  },
  loginUser: async (req, res) => {
    try {
      var email = req.body.email;
      var password = req.body.password;
      if (!email || !password)
        return res.status(400).send('Incorrect Credentials');
      const user = await User.findByEmailAndPassword(email, password)
      if(!user) return res.alert("user not found")
          req.session.userId = user._id;
          req.session.userName = user.name;
          if(user.isadmin === false) return res.redirect("/")
          res.redirect("/dashboard")
    } catch (err) {
        console.log(err);
        if(err.message === "user not found") return res.redirect('/login');
          if (err.name === 'ValidationError')
            return res.status(400).send('Validation Error');
          else return res.status(500).send('Server Error');
    }
  },
  logoutUser: function (req, res) {
    req.session.destroy();
    return res.redirect('/login');
  },
};

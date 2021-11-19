const blogs = require('../models/blog');
module.exports = {
  renderCreatepage: function (req, res) {
      var admin = false
      if(req.user.isadmin === true){
          admin=true
      }
    res.render('createblog', {
      title: 'create Blog',
      userid:req.session.userId,
      isadmin:admin
    });
  },
  renderUpdatepage: async function (req, res) {
    var currentUser = req.user;
    var usersBlogs = currentUser.blogs;
    var admin = false
    if(req.user.isadmin === true){
        admin=true
    }
    var blog = await blogs.findOne({ _id:req.params.blogId})
    res.render('updateblog', {
      title: 'Update Blog',
      blog: blog,
      req: req.path,
      userid:req.session.userId,
      isadmin:admin
    });
  },
  renderDashboard: async (req, res) => {
    try {
        var admin = false
        if(req.user.isadmin === true){
            admin=true
        }
      username = req.session.userName;
      var user = req.user;
      if(user.isadmin === false) return res.redirect('/');
      const Blog = await blogs.find({user:user._id});
      res.render('dashboard', {
        title: 'dashboard page',
        name: username,
        length: user.blogs.length,
        blog: Blog,
        userid:req.session.userId,
        dashboard: true,
        isadmin:admin
      });
    } catch (err) {
      if (err) res.render('/login');
    }
  },
};

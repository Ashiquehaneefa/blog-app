var blogs = require('../models/blog');
module.exports = {
  createBlog: async (req, res) => {
    try {
      var user = req.user;
      var blog = new blogs({ ...req.body, user: user._id });
      user.blogs.push(blog._id);
      await user.save();
      await blog.save();
      return res.redirect('/dashboard');
    } catch (err) {
      if (err.name === 'ValidationError')
        return res.status(400).send(`Validation Error: ${err.message}`);
      return res.status(500).redirect('/dashboard');
    }
  },
  updateBlog: async (req, res) => {
    try {
      // var blogId = req.user.blog._id
      var newUpdatedObject = { ...req.body };
      var blogId = req.params.blogId;
      const responce = await blogs.updateOne(
        { _id: blogId },
        { $set: newUpdatedObject },
        { new: true }
      );
      if (!responce) return res.status(404).send('responce error');
      res.redirect('/dashboard');
    } catch (err) {
      console.log(err.message);
      return res.status(500).redirect('/dashboard');
    }
  },

  deleteBlog: async (req, res) => {
    try {
      var blogId = req.params.blogId;
      const deleteBlog = await blogs.deleteOne({ _id: blogId });
      if (!deleteBlog) return res.send('blog not found');

      res.redirect('/dashboard');
    } catch (err) {
      console.log('server error 5');
      return res.redirect('/dashboard');
    }
  },
  homepage: async (req, res) => {
    try {
        var admin = false
        if(req.user.isadmin === true){
            admin=true
        }
      const Blogs = await blogs.find();
      res.render('index', {
        title: 'home page',
        blog: Blogs,
        userid:req.session.userId,
        isadmin:admin
      });
    } catch (err) {
        console.log(err)
      console.log('server error 5');
      res.status(500).send('server error 8');
    }
  },
};

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
blogschema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },  
    user: { ref: 'user', type: Schema.Types.ObjectId },
  },
  { timestamps: true }
);
var blog = mongoose.model('blog', blogschema);
module.exports = blog;

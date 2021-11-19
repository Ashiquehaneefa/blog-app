var express = require("express")
var session = require("express-session")
var methodoveride=require("method-override")
var hbs=require("hbs")
var path=require("path")
var dotenv=require("dotenv")
dotenv.config({path:".env"})
var todoAPIRoutes = require("./routes/blogAPiroutes");
var userAPIRoutes = require("./routes/userApiRoutes");
var todoNormalRoutes = require("./routes/blogNormalroute");
var userNormalRoutes = require("./routes/userNormalRoute");

require("./db")
var app=express()



app.set("view engine","hbs")
app.set("view options",{layout:"main"})
app.use(methodoveride("logout"))
app.use(express.static(path.join(__dirname,"static")))
hbs.registerPartials(path.join(__dirname,"views","partials"))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(session({
    secret:"secretkey",
    resave:false,
    name:"blogSession",
    saveUninitialized:false,
    cookie:{
        maxAge:100*60*30,
        httpOnly:true,
        secure:false,
        sameSite:"strict"
    }
}))
hbs.registerHelper("constructDelete", function() {
    return `/blog/delete/${this._id}?logout=DELETE`;
  });
  
  hbs.registerHelper("constructUpdate", function() {
    return `/blog/update/${this._id}`;
  });

  app.use(userNormalRoutes);
  app.use(todoNormalRoutes);
  app.use(userAPIRoutes);
  app.use(todoAPIRoutes);
  app.use(function(err,req,res,next){
    if(err.name="multerError") return res.send(err.message)
    console.log(err.message)
    // res.send(err.message)
})
const port=process.env.PORT ||3000
app.listen(port,function(){
    console.log("server started successfully")
})
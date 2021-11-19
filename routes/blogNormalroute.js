var express=require("express")
var router=express.Router()
var authenticate=require("../middleware/authenticate")
var isAdmin =require("../middleware/isAdmin")
var blogNormalroute=require("../controllers/blogNormalcontroller")
router.get("/blog/create",authenticate,blogNormalroute.renderCreatepage)
router.get("/blog/update/:blogId",authenticate,blogNormalroute.renderUpdatepage)
router.get("/dashboard",authenticate,blogNormalroute.renderDashboard)

module.exports=router
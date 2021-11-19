var express=require("express")
var router=express.Router()
var usernormalcontroller=require("../controllers/userNormalcontroller")
router.get("/register",usernormalcontroller.renderRegisterPage)
router.get("/login",usernormalcontroller.renderLoginPage)

module.exports=router              
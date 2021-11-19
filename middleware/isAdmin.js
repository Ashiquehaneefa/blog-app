var User = require("../models/user")

function isAdmin (req,res,next){
    
    if (req.session.userId){
        User.findById(req.session.userId).then(responce=>{
            if(responce.isadmin === false) return res.redirect("/");
            req.user = responce
            next()
        }).catch(err=>{
            console.log(err)
            res.status(402).send("invalid Credentials")
        })
    }
    else{
        res.status(402).send("invalid credentials")
    }
}

module.exports = isAdmin
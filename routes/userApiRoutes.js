var express = require('express');
var router = express.Router();

var userApicontroller = require('../controllers/userApicontroller');
router.post('/register', userApicontroller.registerUser);
router.post('/login', userApicontroller.loginUser);
router.get('/logout', userApicontroller.logoutUser);
module.exports = router;

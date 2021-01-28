const express=require('express');
authController=require('../controllers/auth');
const mysql = require("mysql");
const connection  = require('../Config/conn');
const router=express.Router();


router.post('/register',authController.register);


module.exports = router ;
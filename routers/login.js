const express=require('express');
const jwt = require('jsonwebtoken');  
const verify = require ('../verifyToken');
const connection  = require('../Config/conn');
authController=require('../controllers/auth');
const router=express.Router();

//not fully functioning
router.post('/admin',authController.AdminLogin);
router.post('/customer',authController.Authent);


module.exports=router;
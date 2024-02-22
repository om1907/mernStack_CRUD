const express=require('express');
const {userLogin,userSignUp} =require('../Controllers/userAuthControllers');

const router=express.Router();

router.route('/userlogin').post(userLogin);
router.route('/usersignup').post(userSignUp);


module.exports=router;
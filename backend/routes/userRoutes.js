const express = require('express')
const { createUser, getAllUserData, getSingleUserData, updateUserData, deleteUser ,getProfilePic} = require('../Controllers/userController');

const router = express.Router();

const authenticatedUser=require('../middleware/auth')

router.route('/show/:uuid').get(getProfilePic) 

router.route('/createuser').post(createUser);

router.route('/getalluserdata').get(getAllUserData);

router.route('/getuserData/:id').get(getSingleUserData);

router.route('/updateuser/:id').put(updateUserData);

router.route('/deleteuser/:id').delete(deleteUser);

module.exports = router;
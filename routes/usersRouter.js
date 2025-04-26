// In routes/usersRouter.js

var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middlewares/uploadFile');
const {requireAuthUser} = require('../middlewares/authMiddleware');

/* GET users listing. */
router.post('/addUserClient',userController.addUserClient); 
router.post('/addUserAdmin',userController.addUserAdmin);
router.post('/login',userController.login); 
router.post('/logout',userController.logout); 
router.get('/getAllUsers',userController.getAllUsers); 
router.get('/getUserById/:id',userController.getUserById);
router.get('/searchUserByUsername',userController.searchUserByUsername);
router.get('/getAllUsersSortByAge',userController.getAllUsersSortByAge); 
router.get('/getAllUsersAge/:age',userController.getAllUsersAge); 
router.get('/getAllUsersAgeBetMaxAgeMinAge',userController.getAllUsersAgeBetMaxAgeMinAge); 
router.get('/getAllClient',userController.getAllClient); 
router.get('/getAllAdmin',userController.getAllAdmin); 
router.put('/updateuserById/:id',userController.updateuserById); 
router.delete('/deleteUserById/:id',userController.deleteUserById); 

// Add these new routes
router.post('/send-reset-code', userController.sendResetCode);
router.post('/verify-reset-code', userController.verifyResetCode);
router.post('/reset-password', userController.resetPassword);

router.post('/addUserClientWithImg',upload.single("image_user"),userController.addUserClientWithImg);

module.exports = router;
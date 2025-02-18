const router = require('express').Router(); 
const UserController = require('../controllers/user.controller')

router.post("/Validateuser", UserController.ValidateUser)
 
module.exports = router
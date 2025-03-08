const router = require('express').Router(); 
const UserController = require('../controllers/user.controller')

router.post("/Validateuser", UserController.ValidateUser)
router.get("/GetScreenList", UserController.GetScreenList)
 
module.exports = router
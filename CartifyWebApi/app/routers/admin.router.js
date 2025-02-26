const router = require('express').Router(); 
const AdminController = require('../controllers/admin.controller')

router.get("/GetScreenList", AdminController.GetScreenList)
 
module.exports = router
const router = require('express').Router();
const AdminController = require('../controllers/admin.controller')
const VerifyToken = require('../middleware/authMiddleware')

router.get("/GetScreenList", VerifyToken, AdminController.GetScreenList)

module.exports = router
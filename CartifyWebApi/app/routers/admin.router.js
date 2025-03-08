const router = require('express').Router();
const AdminController = require('../controllers/admin.controller')
const VerifyToken = require('../middleware/authMiddleware')
 

module.exports = router
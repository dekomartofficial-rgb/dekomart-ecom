const router = require('express').Router();
const AdminController = require('../controllers/admin.controller')
const VerifyToken = require("../middleware/authMiddleware");

router.get("/GetRole", VerifyToken, AdminController.GetRole);

module.exports = router
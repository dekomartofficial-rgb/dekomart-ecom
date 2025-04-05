const router = require('express').Router();
const AdminController = require('../controllers/admin.controller')
const VerifyToken = require("../middleware/authMiddleware");

router.get("/GetRole", VerifyToken, AdminController.GetRole);
router.get("/GetScreenRoleAccess", VerifyToken, AdminController.GetRoleScreenAccess);
router.get("/SaveProduct", VerifyToken, AdminController.SaveProduct);
router.get("/UpdateProduct", VerifyToken, AdminController.UpdateProduct);
router.get("/DeleteProduct", VerifyToken, AdminController.DeleteProduct)

module.exports = router
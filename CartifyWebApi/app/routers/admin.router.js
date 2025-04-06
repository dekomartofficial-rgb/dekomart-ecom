const router = require('express').Router();
const AdminController = require('../controllers/admin.controller')
const VerifyToken = require("../middleware/authMiddleware");

router.get("/GetRole", VerifyToken, AdminController.GetRole);
router.get("/GetScreenRoleAccess", VerifyToken, AdminController.GetRoleScreenAccess);
router.post("/SaveProduct", VerifyToken, AdminController.SaveProduct);
router.get("/DeleteProduct", VerifyToken, AdminController.DeleteProduct)
router.get("/GetScreenRoleAccess", VerifyToken, AdminController.GetRoleScreenAccess)
router.post("/SaveRoleRight", VerifyToken, AdminController.SaveRoleRight)

module.exports = router
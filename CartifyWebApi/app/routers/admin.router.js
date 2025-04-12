const router = require('express').Router();
const AdminController = require('../controllers/admin.controller')
const VerifyToken = require("../middleware/AuthMiddleware");

router.get("/GetRole", VerifyToken, AdminController.GetRole);
router.get("/GetScreenRoleAccess", VerifyToken, AdminController.GetRoleScreenAccess);
router.get("/GetAllGroupName", VerifyToken, AdminController.GetAllGroupName)
router.get("/GetRefData", VerifyToken, AdminController.GetRefData)

// router.post("/SaveProduct", upload.any(),VerifyToken, AdminController.SaveProduct);
// router.get("/DeleteProduct", VerifyToken, AdminController.DeleteProduct) 
router.post("/SaveRoleRight", VerifyToken, AdminController.SaveRoleRight)

module.exports = router
const router = require('express').Router();
const AdminController = require('../controllers/admin.controller')
const VerifyToken = require("../middleware/AuthMiddleware");

router.get("/GetRole", VerifyToken, AdminController.GetRole);
router.get("/GetScreenRoleAccess", VerifyToken, AdminController.GetRoleScreenAccess);
router.get("/GetAllGroupName", VerifyToken, AdminController.GetAllGroupName)
router.get("/GetRefData", VerifyToken, AdminController.GetRefData)
router.get("/GetRefGroupData", VerifyToken, AdminController.GetRefGroupData)
router.get("/GetProductsDashboard", VerifyToken, AdminController.GetAllProductsdashboard)
router.post("/SaveRefData", VerifyToken, AdminController.SaveRefData)
router.post("/SaveProductHeader", VerifyToken, AdminController.SaveProductHeader) 
router.post("/SaveRoleRight", VerifyToken, AdminController.SaveRoleRight)
router.get("/GetProductAndVariant", VerifyToken, AdminController.GetProductAndVariant)

module.exports = router
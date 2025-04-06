const router = require('express').Router();
const AdminController = require('../controllers/admin.controller')
const VerifyToken = require("../middleware/authMiddleware");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/GetRole", VerifyToken, AdminController.GetRole);
router.get("/GetScreenRoleAccess", VerifyToken, AdminController.GetRoleScreenAccess);
router.post("/SaveProduct", upload.any(),VerifyToken, AdminController.SaveProduct);
router.get("/DeleteProduct", VerifyToken, AdminController.DeleteProduct)
router.get("/GetScreenRoleAccess", VerifyToken, AdminController.GetRoleScreenAccess)
router.post("/SaveRoleRight", VerifyToken, AdminController.SaveRoleRight)

module.exports = router
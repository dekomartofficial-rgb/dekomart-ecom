const router = require('express').Router();
const AdminController = require('../controllers/admin.controller')
const VerifyToken = require("../middleware/AuthMiddleware");
const multer = require('multer');
const storage = multer.memoryStorage();  // files stored in memory buffer
const upload = multer({ storage: storage });

router.get("/GetRole", VerifyToken, AdminController.GetRole);
router.get("/GetScreenRoleAccess", VerifyToken, AdminController.GetRoleScreenAccess);
router.get("/GetAllGroupName", VerifyToken, AdminController.GetAllGroupName)
router.get("/GetRefData", VerifyToken, AdminController.GetRefData)
router.get("/GetRefGroupData", VerifyToken, AdminController.GetRefGroupData)
router.get("/GetProductAndVariant", VerifyToken, AdminController.GetProductAndVariant)
router.get("/GetProductsDashboard", VerifyToken, AdminController.GetAllProductsdashboard)
router.get("/GetSystemParm", VerifyToken, AdminController.GetSystemParm)
router.get('/GetDocument', VerifyToken, AdminController.GetDocument)
router.post("/SaveRefData", VerifyToken, AdminController.SaveRefData)
router.post("/SaveProductHeader", VerifyToken, upload.array('ProductUpload'), AdminController.SaveProductHeader)
router.post("/SaveRoleRight", VerifyToken, AdminController.SaveRoleRight)

module.exports = router


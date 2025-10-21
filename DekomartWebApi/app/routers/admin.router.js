const router = require('express').Router();
const AdminController = require('../controllers/admin.controller')
const MainController = require('../controllers/main.controller')
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
router.get('/GetAllUserOrder', VerifyToken, AdminController.GetAllUserOrder)
router.get('/GetOrderDetails', VerifyToken, AdminController.GetOrderDetails)
router.post('/SaveValidateAdminOtp', AdminController.SaveValidateAdminOtp)
router.post("/SaveRefData", VerifyToken, AdminController.SaveRefData)
router.post("/SaveProductHeader", VerifyToken, upload.array('ProductUpload'), AdminController.SaveProductHeader)
router.post("/DeleteAttachment", VerifyToken, MainController.DeleteAttchment)
router.post("/SaveRoleRight", VerifyToken, AdminController.SaveRoleRight)
router.post("/MoveToNextStep", VerifyToken, AdminController.MoveToNextStep)

module.exports = router


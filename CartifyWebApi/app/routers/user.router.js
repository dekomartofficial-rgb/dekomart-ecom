const router = require("express").Router();
const UserController = require("../controllers/user.controller");
const VerifyToken = require("../middleware/AuthMiddleware");

router.get("/GetScreenList", VerifyToken, UserController.GetScreenList);
router.get("/GetUserProfiler", VerifyToken, UserController.GetUserProfile);
router.get("/GetUser", VerifyToken, UserController.GetUser);
router.get("/GetUserRole", VerifyToken, UserController.GetUserRole)
router.get('/GetUserRoleScreens', VerifyToken, UserController.GetUserRoleScreens);
router.get('/GetUserHome', UserController.GetUserHome)
router.get('/GetProductDetails', UserController.GetProductDetails)
router.get('/GetUserCart', VerifyToken, UserController.GetUserCart)
router.post("/Validateuser", UserController.ValidateUser);
router.post("/SaveUser", VerifyToken, UserController.SaveUser);
router.post('/SaveCustomer', UserController.SaveNewCustomer);
router.post('/ResetPassword', VerifyToken, UserController.ResetPassword)
router.post('/SaveAddToCart', VerifyToken, UserController.SaveAddToCart)

module.exports = router;

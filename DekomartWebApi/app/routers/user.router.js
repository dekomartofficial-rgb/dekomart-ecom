const router = require("express").Router();
const PaymentController = require("../controllers/payment.controller");
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
router.get('/GetUserAddress', VerifyToken, UserController.GetUserAddress)
router.get('/GetCheckOutDetails', VerifyToken, UserController.GetCheckDetails)
router.get('/GetOrderDetails', VerifyToken, UserController.GetOrderDetails)
router.get('/GenerateInvoice', UserController.GetOrderInvoice)
router.post("/Validateuser", UserController.ValidateUser);
router.post("/SaveUser", VerifyToken, UserController.SaveUser);
router.post('/SaveCustomer', UserController.SaveNewCustomer);
router.post('/ResetPassword', VerifyToken, UserController.ResetPassword)
router.post('/SaveAddToCart', VerifyToken, UserController.SaveAddToCart)
router.post('/SaveUserAddress', VerifyToken, UserController.SaveUserAddress)
router.post('/Payment/CreateOrder', VerifyToken, PaymentController.PaymentCreateOrder)
router.post('/SaveUserOrder', VerifyToken, UserController.SaveUserOrder)
router.post('/SavePlaceOrder', VerifyToken, UserController.SavePlaceOrder)


module.exports = router;

const router = require("express").Router();
const UserController = require("../controllers/user.controller");
const VerifyToken = require("../middleware/AuthMiddleware");

router.get("/GetScreenList", VerifyToken, UserController.GetScreenList);
router.get("/GetUserProfiler", VerifyToken, UserController.GetUserProfile);
router.get("/GetUser", VerifyToken, UserController.GetUser);
router.get("/GetUserRole",VerifyToken, UserController.GetUserRole)
router.post("/Validateuser", UserController.ValidateUser);
router.post("/SaveUser", VerifyToken, UserController.SaveUser);


module.exports = router;

const router = require("express").Router();
const UserController = require("../controllers/user.controller");
const VerifyToken = require("../middleware/authMiddleware");

router.post("/Validateuser", UserController.ValidateUser);
router.get("/GetScreenList", VerifyToken, UserController.GetScreenList);
router.get("/GetUserProfiler", VerifyToken, UserController.GetUserProfile);

module.exports = router;

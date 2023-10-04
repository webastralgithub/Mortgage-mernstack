const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/middleware"); // Import the verifyToken middleware

// Apply the verifyToken middleware to restrict access
router.post("/create-user",verifyToken,  UserController.createUser);

router.get("/get-users",verifyToken, UserController.getAllUsers);
router.put("/update",verifyToken, UserController.getAllUsers);
router.put('/admin/change-password/:userId', UserController.changePassword)
router.put('/admin/change-realtor/:userId', UserController.changeRealtor)
router.get("/get-current-user",verifyToken, UserController.getUser);
router.get("/get-realtor/:id",verifyToken, UserController.getRealtor);

module.exports = router;

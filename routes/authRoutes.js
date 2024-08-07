const express = require("express");
const {
  registerController,
  loginController,
  currentUserController,
} = require("../controllers/authController");
const authMiddelware = require("../middlewares/authMiddelware");
const uploadMiddleware = require("../middlewares/multer_middleware")
const router = express.Router();

//routes
//REGISTER || POST
router.post("/register", uploadMiddleware, registerController);

//LOGIN || POST
router.post("/login", loginController);

//GET CURRENT USER || GET
router.get("/current-user", authMiddelware, currentUserController);

module.exports = router;

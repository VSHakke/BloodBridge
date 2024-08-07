const express = require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const {
  bloodGroupDetailsContoller,
  bloodGroupDetailsForAdminContoller
} = require("../controllers/analyticsController");

const router = express.Router();

//routes

//GET BLOOD DATA
router.get("/bloodGroups-data", authMiddelware, bloodGroupDetailsContoller);
router.get("/bloodGroups-data-for-admin", authMiddelware, bloodGroupDetailsForAdminContoller);

module.exports = router;

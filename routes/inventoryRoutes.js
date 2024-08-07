const express = require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const {
  createInventoryController,
  getInventoryController,
  getDonorsController,
  getHospitalController,
  getOrganisationController,
  getOrganisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
  getLatestDonationController,
  getAllDonationsOfDonor,
  getAllBloodTransactions
} = require("../controllers/inventoryController");

const router = express.Router();

//routes
//GET ALL BLOOD RECORDS FOR ADMIN
router.get("/get-inventory", authMiddelware, getInventoryController);

//GET RECENT BLOOD RECORDS
router.get(
  "/get-recent-inventory",
  authMiddelware,
  getRecentInventoryController
);



/***********************************/


// ADD INVENTORY || POST
router.post("/create-inventory", authMiddelware, createInventoryController);

//get latest donations of current user for decideing if user is eligible to donate or not
router.get("/get-latest-donation", authMiddelware, getLatestDonationController);

//to get donation of current donor for donor page
router.get("/get-all-donations-of-donor", authMiddelware, getAllDonationsOfDonor);

//to get all blood transaction for admin
router.get("/get-all-blood-transactions", authMiddelware, getAllBloodTransactions);

//GET HOSPITAL BLOOD RECORDS FOR CONSUMER PURPOSE
router.post(
  "/get-inventory-hospital",
  authMiddelware,
  getInventoryHospitalController
);


//GET organisation RECORDS FOR HOSPITAL FOR ORGANISATION FIELD
router.get(
  "/get-organisation-for-hospital",
  authMiddelware,
  getOrganisationForHospitalController
);


//GET DONAR RECORDS FOR ADMIN
router.get("/get-donors", authMiddelware, getDonorsController);

//GET HOSPITAL RECORDS FOR ADMIN
router.get("/get-hospitals", authMiddelware, getHospitalController);

//GET organisation RECORDS FOR ADMIN
router.get("/get-organisation", authMiddelware, getOrganisationController);

module.exports = router;

const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

// GET ALL BLOOD RECORDS ACCORDING TO ORGANISATION
const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .populate("donor")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      messaage: "get all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get All Inventory",
      error,
    });
  }
};
// GET BLOOD RECORD OF 3
const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .limit(8)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "recent Inventory Data",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Recent Inventory API",
      error,
    });
  }
};

/******************************************** */
// GET DONAR REOCRDS
const getDonorsController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    //find donors
    const donorId = await inventoryModel.distinct("donor", {
      organisation,
    });
    // console.log(donorId);
    const donors = await userModel.find({ _id: { $in: donorId } });

    return res.status(200).send({
      success: true,
      message: "Donor Record Fetched Successfully",
      donors,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Donor records",
      error,
    });
  }
};

const getHospitalController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    //GET HOSPITAL ID
    const hospitalId = await inventoryModel.distinct("hospital", {
      organisation,
    });
    //FIND HOSPITAL
    const hospitals = await userModel.find({
      _id: { $in: hospitalId },
    });
    return res.status(200).send({
      success: true,
      message: "Hospitals Data Fetched Successfully",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In get Hospital API",
      error,
    });
  }
};

// GET ORG PROFILES
const getOrganisationController = async (req, res) => {
  try {
    const donor = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", { donor });
    //find org
    const organisations = await userModel.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "Org Data Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In ORG API",
      error,
    });
  }
};
// GET ORG for Hospital
const getOrganisationForHospitalController = async (req, res) => {
  try {
    const hospital = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", { hospital });
    //find org
    const organisations = await userModel.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "Hospital Org Data Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Hospital ORG API",
      error,
    });
  }
};

/************************************ */

// CREATE INVENTORY
const createInventoryController = async (req, res) => {
  try {
    const { email } = req.body;
    //validation
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User Not Found");
    }
    
    if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);
      //calculate Blood Quanitity
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      // console.log("Total In", totalInOfRequestedBlood);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;
      //calculate OUT Blood Quanitity

      const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

      //in & Out Calc
      const availableQuanityOfBloodGroup = totalIn - totalOut;
      //quantity validation
      if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donor = user?._id;
    }

    //save record
    const inventory = new inventoryModel(req.body);
    console.log(req.body)
    console.log(inventory)
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood Record Added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In ** Create Inventory API",
      error,
    });
  }
};

//last donation done done by donor for deciding if donor is eligible or not
const getLatestDonationController = async (req, res) => {
  try {
    const userId = req.body.userId; // Get user ID from authenticated user
    const latestDonation = await inventoryModel
      .findOne({ donor: userId, inventoryType: "in" }) // Only 'in' donations are considered
      .sort({ createdAt: -1 }); // Sort by most recent donation
    if (!latestDonation) {
      return res.status(200).send({
        success: true,
        message: "No donation records found for this user.",
        days:0,
        eligible: true,
      });
    }
    // Calculate the time since the last donation
    const lastDonationDate = new Date(latestDonation.createdAt);
    const currentDate = new Date();
    const timeDifferenceInDays = Math.floor((currentDate - lastDonationDate) / (1000 * 60 * 60 * 24));

    // Determine eligibility based on time since last donation
    const eligible = timeDifferenceInDays >= 56; // Assuming eligibility criteria is 56 days
    return res.status(200).send({
      success: true,
      message: "Latest donation record fetched successfully.",
      days:56-timeDifferenceInDays,
      eligible,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching the latest donation.",
      error,
    });
  }
};

//To get all donation by current donor
const getAllDonationsOfDonor = async (req, res) => {
  try {
    const userId = req.body.userId;

    // Fetch all donations for the user
    const allDonations = await inventoryModel.find({ donor: userId, inventoryType: "in" }).sort({ createdAt: -1 });

    if (!allDonations || allDonations.length === 0) {
      return res.status(200).send({
        success: true,
        message: "No donation records found for this user.",
        donations: [],
      });
    }

    // Fetch organisation names
    const donationsWithOrgNames = await Promise.all(
      allDonations.map(async (donation) => {
        const organisation = await userModel.findById(donation.organisation).select("organisationName");
        return {
          _id: donation._id,
          organisationName: organisation ? organisation.organisationName : "Unknown Organisation",
          quantity: donation.quantity,
          createdAt: donation.createdAt,
          orgEmail: donation.orgEmail
        };
      })
    );

    return res.status(200).send({
      success: true,
      message: "All donations fetched successfully.",
      donations: donationsWithOrgNames,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching donations.",
      error,
    });
  }
};

//to get all blood transactions for admin
const getAllBloodTransactions = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({})
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "All Inventory Data",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Inventory API",
      error,
    });
  }
};


// // GET HOSPITAL BLOOD RECORDS FOR CONSUMER IN HOSPITAL FEILD
const getInventoryHospitalController = async (req, res) => {
  try {
    // Step 1: Fetch the inventory records and populate the hospital field
    
    const userId = req.body.userId;

    // Fetch all donations for the user
    const inventory = await inventoryModel.find({ hospital:userId, inventoryType: "out" }).sort({ createdAt: -1 });

    // Step 2: Fetch organization names and add them to the inventory records
    const populatedInventory = await Promise.all(
      inventory.map(async (item) => {
        if (item.organisation) {
          const organisation = await userModel.findById(item.organisation);
          return {
            ...item._doc, // Spread the original item properties
            organisationName: organisation ? organisation.organisationName : 'Unknown' // Add the organization name
          };
        }
        return item;
      })
    );

    // Step 3: Send the combined results in the response
    return res.status(200).send({
      success: true,
      message: "Got hospital consumer records successfully",
      inventory: populatedInventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get consumer Inventory",
      error,
    });
  }
};

module.exports = {
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
};

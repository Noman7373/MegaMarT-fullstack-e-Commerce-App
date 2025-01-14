import addressModel from "../models/addressModel.js";
import userModel from "../models/userModel.js";

// Created user Adress Controller
const createAddressController = async (req, res) => {
  try {
    const {
      userId,
      address_line,
      city,
      state,
      pincode,
      country,
      mobile,
      status,
    } = req.body;

    const newUserAddress = new addressModel({
      address_line,
      city,
      state,
      pincode,
      country,
      mobile,
      userId,
    });

    const savedAddress = await newUserAddress.save();

    const updateUser = await userModel.updateOne(
      { _id: userId },
      {
        $push: { address_details: savedAddress._id },
      }
    );

    if (updateUser.nModified === 0) {
      return res.status(404).json({
        message: "User not found or address not updated!",
        error: true,
        success: false,
      });
    }

    // Success response
    return res.status(201).json({
      message: "Address Added Successfully!",
      error: false,
      success: true,
      address: savedAddress,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// Get Address Controller
const getUsersAddressController = async (req, res) => {
  try {
    const { _id } = req.query;

    const userAddressDetails = await addressModel
      .find({ userId: _id })
      .sort({ createdAt: -1 });

    if (!userAddressDetails || userAddressDetails.length === 0) {
      return res.status(404).json({
        message: "No address found for the given user ID.",
        error: true,
        success: false,
        userAddressDetails: [],
      });
    }

    return res.status(200).json({
      message: "User address retrieved successfully!",
      error: false,
      success: true,
      userAddressDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};
// Get Address Controller
const deleteUsersAddressController = async (req, res) => {
  try {
    const { _id } = req.body;

    const userAddressDetails = await addressModel.findByIdAndDelete({
      _id,
    });

    return res.status(200).json({
      message: "Address deleted successfully!",
      error: false,
      success: true,
      userAddressDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

// Update User Address Controller
const updateUsersAddressController = async (req, res) => {
  try {
    const { _id, address_line, city, state, pincode, country, mobile } =
      req.body;

    // Validate _id format (Optional)
    if (!/^[0-9a-fA-F]{24}$/.test(_id)) {
      return res.status(400).json({
        message: "Invalid ID format!",
        error: true,
        success: false,
      });
    }

    const userAddressDetails = await addressModel.findOneAndUpdate(
      { _id }, // Filter by userId
      { address_line, city, state, pincode, country, mobile }, // Update fields
      { new: true, runValidators: true }
    );

    console.log(userAddressDetails);

    // Check if the address was found and updated
    if (!userAddressDetails) {
      return res.status(404).json({
        message: "Address not found!",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Address Update successfully!",
      error: false,
      success: true,
      userAddressDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

export {
  createAddressController,
  getUsersAddressController,
  deleteUsersAddressController,
  updateUsersAddressController,
};

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

export { createAddressController };

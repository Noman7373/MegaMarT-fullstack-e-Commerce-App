import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import sendEmail from "../DB/sendEmail.js";
import verifyEmailTemplate from "../utils/verifyEmailTamplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";

const registerUsersController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Provide Name , Email and Password",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findOne({ email });

    if (user) {
      return res.json({
        message: "Email Already Exits Please provide another Email",
        error: true,
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const Payload = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = await userModel(Payload);
    const saveUser = await newUser.save();

    const Verify_URL = `${process.env.FRONTEND_URL}/verify-email?id=${saveUser.id}`;
    const sendEmailVerify = sendEmail({
      sendTo: email,
      subject: "Verification email from Resend",
      html: verifyEmailTemplate({
        name,
        url: Verify_URL,
      }),
    });

    return res.json({
      message: "User Register Successfully",
      success: true,
      error: false,
      data: saveUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

//  User log In Controller
const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please Provide Email and Password",
        error: true,
        success: false,
      });
    }

    const userExits = await userModel.findOne({ email });

    if (!userExits) {
      return res.status(400).json({
        message: "User Not Found",
        error: true,
        success: false,
      });
    }

    //  Checking User acitve or InActive
    if (userExits.status !== "Active") {
      return res.status(402).json({
        message: "Contact to Admin",
        error: true,
        success: false,
      });
    }

    //  Password checking
    const passwordCompare = await bcrypt.compare(password, userExits.password);

    if (!passwordCompare) {
      return res.status(400).json({
        message: "Password Not Match Please Provide Correct Password",
        error: true,
        success: false,
      });
    }

    // import AccessToken and RefreshToke
    const accessToken = await generateAccessToken(userExits.id);
    const refreshToken = await generateRefreshToken(userExits.id);

    // cookies options
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    // send token to via response.cookie
    res.cookie("AccessToken", accessToken, cookiesOption);
    res.cookie("RefreshToken", refreshToken, cookiesOption);
    return res.status(200).json({
      message: "Login Successfully",
      success: true,
      error: false,
      date: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const verifyUserEmailController = async (req, res) => {
  try {
    const { id } = req.body;

    const user = await userModel.findOne({ _id: id });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email",
        error: true,
        success: false,
      });
    }

    const updateUser = await userModel.findByIdAndUpdate(id, {
      verify_email: true,
    });

    if (!updateUser) {
      return res.status(404).json({
        message: "User Not Fount",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Email Verified Successfully",
      status: true,
      error: false,
      data: updateUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const logOutController = async (req, res) => {
  try {
    const userId = req.userId; // importing from middleware

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("AccessToken", cookiesOption);
    res.clearCookie("RefreshToken", cookiesOption);

    const removeRefreshToken = await userModel.findByIdAndUpdate(userId, {
      refresh_token: "",
    });

    return res.status(200).json({
      message: "Log out Successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// Upload Avatar Controller
const uploadAvatarController = async (req, res) => {
  try {
    // for getting email file multer
    const image = req.file;
    console.log("Image", image);
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export {
  registerUsersController,
  verifyUserEmailController,
  userLoginController,
  logOutController,
  uploadAvatarController,
};

import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import sendEmail from "../DB/sendEmail.js";
import verifyEmailTemplate from "../utils/verifyEmailTamplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import uploadImagesCloudinary from "../utils/uploadImages.js";
import generateOtp from "../utils/generateOtp.js";
import forgotOtpTamplete from "../utils/VerifyOtpTamplate.js";
import jwt from "jsonwebtoken";

// Register User Controller
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

    // cookies otpions
    const cookiesotpion = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    // send token to via response.cookie
    res.cookie("AccessToken", accessToken, cookiesotpion);
    res.cookie("RefreshToken", refreshToken, cookiesotpion);
    return res.status(200).json({
      message: "Login Successfully",
      success: true,
      error: false,
      tokens: {
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

// Forgot Password Controller   // User not log in
const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    const userExits = await userModel.findOne({ email: email });

    // console.log("userExits", userExits.email);

    if (!userExits) {
      return res.status(400).json({
        message: "Email Not Availble",
        error: true,
        success: false,
      });
    }

    // import OTP function from ./utils
    const otp = generateOtp();
    const expireOtp = new Date(Date.now() + 60 * 1000); // otp will expire after 1 minute

    const saveOtp = await userModel.findByIdAndUpdate(userExits._id, {
      forgot_password_otp: otp,
      forgot_password_expire: new Date(expireOtp).toISOString(),
    });
    console.log(otp);

    await sendEmail({
      sendTo: userExits.email,
      subject: "Forgot Password from ShopHub",
      html: forgotOtpTamplete(otp),
    });

    return res.status(200).json({
      message: "Please Check your Email",
      success: true,
      error: false,
      id: userExits._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
    });
  }
};

// Verify OTP Password

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(401).json({
        message: "Please provide requried fields",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
        error: true,
        success: false,
        id: user._id,
      });
    }

    let currentTime = new Date().toISOString();

    if (user.forgot_password_expire < currentTime) {
      return res.status(400).json({
        message: "OTP has been expired Resend OTP",
        error: true,
        success: false,
      });
    }

    if (otp !== user.forgot_password_otp) {
      return res.status(400).json({
        message: "Invalid OTP",
        error: true,
        success: false,
      });
    }

    console.log(user.forgot_password_otp);

    return res.status(200).json({
      message: "otp Verify Successfully",
      error: false,
      success: true,
      id: user._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

//  Reset Password
const resetPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword, confirmNewPassword } = req.body;

    if (!newPassword || !confirmNewPassword) {
      return res.json(401).status({
        message: "Please provide New Password and Cofirm New Password",
        error: true,
        success: false,
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(401).json({
        message: "Password not match with Confirm New Password",
        error: true,
        success: false,
      });
    }

    const findUser = await userModel.findById({ _id: id });

    if (!findUser) {
      return res.status(401).json({
        message: "Invalid User",
        error: true,
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    const user = await userModel.findByIdAndUpdate(id, {
      password: hashPassword,
    });

    return res.status(201).json({
      message: "New Password added successfully",
      error: false,
      success: true,
      data: user._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// Verify User Email Controller
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
        message: "User Not Found",
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

// Logout User Controller
const logOutController = async (req, res) => {
  try {
    const userId = req.userId; // importing from middleware

    const cookiesotpion = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("AccessToken", cookiesotpion);
    res.clearCookie("RefreshToken", cookiesotpion);

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
    const userId = req.userId; // auth middleware

    const image = req.file; // multer middleware

    // import uploadImageCloudinary
    const upload = await uploadImagesCloudinary(image);

    const updateUser = await userModel.findByIdAndUpdate(userId, {
      avater: upload.url,
    });

    return res.status(200).json({
      message: "Profile Uploaded",
      success: true,
      error: false,
      data: {
        _id: userId,
        avater: upload.url,
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

// Update User Detail (name,email,password,profileImage)
const updateUserDetailsController = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, email, password, mobile } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const updateUserProfile = await userModel.findByIdAndUpdate(id, {
      name,
      email,
      password: hashPassword,
      mobile,
    });

    return res.status(200).json({
      message: "Profile Updated",
      success: true,
      error: false,
      data: updateUserProfile,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// Refresh Token Controller
const refreshTokenController = async (req, res) => {
  try {
    // get the refresh token
    const refreshToken =
      req.cookies.RefreshToken || req?.header?.authorization?.split(" ")[1]; // ["Bearer","Token"] for mobile cookie

    if (!refreshToken) {
      return res.status(401).json({
        message: "Invalid Token",
        error: true,
        success: false,
      });
    }

    const checkRefreshToken = await jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );

    if (!checkRefreshToken) {
      return res.status(400).json({
        message: "Refresh Token Expired",
        error: true,
        success: false,
      });
    }

    // if refresh token is not expired then we generte the new token and send it to the client side

    const userId = checkRefreshToken?.id;

    const newAccessToken = await generateAccessToken(userId);

    const cookiesotpion = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("AccessToken", newAccessToken, cookiesotpion);

    return res.status(201).json({
      message: "New Access Token Generated",
      error: false,
      success: true,
      tokens: {
        accessToken: newAccessToken,
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

export {
  registerUsersController,
  userLoginController,
  verifyUserEmailController,
  logOutController,
  uploadAvatarController,
  updateUserDetailsController,
  forgotPasswordController,
  verifyOtp,
  resetPassword,
  refreshTokenController,
};

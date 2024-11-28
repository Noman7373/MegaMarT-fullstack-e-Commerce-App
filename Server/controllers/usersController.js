import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import sendEmail from "../DB/sendEmail.js";
import verifyEmailTemplate from "../utils/verifyEmailTamplate.js";

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

    const Verify_URL = `${process.env.FRONTEND_URL}/verify-email?code=${saveUser.id}`;
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

export default registerUsersController;

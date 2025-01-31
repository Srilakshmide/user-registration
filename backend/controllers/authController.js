const User = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Joi = require("joi");
require("dotenv").config();

// Email Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// User Registration
exports.registerUser = async (request, h) => {
  const { name, email, password, company, age, dob, image } = request.payload;

  // Validation
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    company: Joi.string(),
    age: Joi.number(),
    dob: Joi.date(),
    image: Joi.string(),
  });

  const { error } = schema.validate({ name, email, password, company, age, dob, image });
  if (error) return h.response({ message: error.details[0].message }).code(400);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, company, age, dob, image });
    await newUser.save();
    return h.response({ message: "User registered successfully" }).code(201);
  } catch (err) {
    return h.response({ message: "Server error" }).code(500);
  }
};

// User Login
exports.loginUser = async (request, h) => {
  const { email, password } = request.payload;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return h.response({ message: "Invalid credentials" }).code(401);
    }

    // Generate OTP and send via email
    const otpCode = generateOTP();
    await OTP.findOneAndUpdate({ email }, { otp: otpCode, expiresAt: Date.now() + 10 * 60 * 1000 }, { upsert: true });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otpCode}. It expires in 10 minutes.`,
    });

    return h.response({ message: "OTP sent to email" });
  } catch (err) {
    return h.response({ message: "Server error" }).code(500);
  }
};

// OTP Verification
exports.verifyOTP = async (request, h) => {
  const { email, otp } = request.payload;
  try {
    const otpRecord = await OTP.findOne({ email });

    if (!otpRecord || otpRecord.otp !== otp || Date.now() > otpRecord.expiresAt) {
      return h.response({ message: "Invalid or expired OTP" }).code(400);
    }

    await OTP.deleteOne({ email });
    return h.response({ message: "OTP verified successfully" });
  } catch (err) {
    return h.response({ message: "Server error" }).code(500);
  }
};

// Delete User Account
exports.deleteAccount = async (request, h) => {
  const { email } = request.payload;

  try {
    await User.findOneAndDelete({ email });
    return h.response({ message: "Account deleted successfully" }).code(200);
  } catch (err) {
    return h.response({ message: "Server error" }).code(500);
  }
};

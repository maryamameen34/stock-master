const User = require("../models/user.js");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const path = require("path");
const crypto = require("crypto");
const ErrorHandler = require("../utils/ErrorHandler");
const userMail = require("../utils/sendEmail");
const sendToken = require("../utils/jwtToken");
const catchAsyncError = require("../middlewares/catchAsyncError");
const Notification = require("../models/notification.js");
const bcrypt = require('bcryptjs');



exports.preSignUp = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const filename = req.file.filename;
    const fileUrl = path.join("/uploads", filename);
    let roleProvided = "";

    if (email === "maryamameen3453@gmail.com") {
      roleProvided = "admin";
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Error deleting files" });
        }
        res.json({ message: "File deleted successfully!" });
      });

      return next(new ErrorHandler("User already exists!", 400));
    }

    if (email === "maryamameen3453@gmail.com") {
      const user = new User({
        first_name,
        last_name,
        email,
        password,
        role: roleProvided,
        profile_pic: fileUrl,
        status: "active",
      });

      const activationToken = createActivationToken(user);
      const activationUrl = `${process.env.FRONTEND_URL}/activation/${activationToken}`;

      await userMail({
        email: user.email,
        subject: "Account Activate Request",
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <table style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; background-color: #f9f9f9; border: 1px solid #ddd; padding: 20px;">
              <thead>
                <tr>
                  <th style="background-color: #4caf50; color: white; padding: 10px 0; text-align: center; font-size: 24px;">
                    Account Activate Request
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding: 20px;">
                    <p style="font-size: 16px; margin: 0;">
                      Hello <strong>${user.first_name}</strong>,
                    </p>
                    <p style="font-size: 16px;">
                      We received a request to activate your account. Click the button below to activate it:
                    </p>
                    <div style="text-align: center; margin: 20px 0;">
                      <a
                        href="${activationUrl}"
                        style="background-color: #4caf50; color: white; padding: 12px 24px; font-size: 16px; text-decoration: none; border-radius: 5px;">
                        Account Activate
                      </a>
                    </div>
                    <p style="font-size: 16px;">
                      If you didn’t request to activate your account, please ignore this email or contact support if you have any concerns.
                    </p>
                    <p style="font-size: 16px;">
                      Thank you,<br>
                      The Support Team
                    </p>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td style="background-color: #f0f0f0; padding: 10px 20px; text-align: center; font-size: 12px; color: #888;">
                    &copy; 2024 YourCompany, All rights reserved.
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        `,
        text: `Hello ${user.first_name},\n\nPlease activate your account by clicking the link below:\n\n${activationUrl}\n\nIf you did not request this, please ignore this email.\n\nThank you,\nThe Support Team`,
      });

      return res.status(201).json({
        success: true,
        message: `Please check your email (${user.email}) to activate your account!`,
      });
    } else {
      return res.status(403).json({
        message: "You do not have permission to create this account.",
      });
    }
  } catch (error) {
    console.log(error.message);
    return next(new ErrorHandler(error.message, 500));
  }
};
exports.preSignUpCustomer = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const filename = req.file.filename;
    const fileUrl = path.join("/uploads", filename);

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Error deleting files" });
        }
        res.json({ message: "File deleted successfully!" });
      });
      return next(new ErrorHandler("User already exists!", 400));
    }
    const payload = {
      first_name,
      last_name,
      email,
      password,
      role: "customer",
      profile_pic: fileUrl,
    };
    const activationToken = jwt.sign(payload, process.env.ACTIVATE_SECRET, {
      expiresIn: process.env.EXPIRE_TIME,
    });
    const activationUrl = `${process.env.FRONTEND_URL}/activation/${activationToken}`;

    await userMail({
      email,
      subject: "Account Activate Request",
      html: `
          <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <table style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; background-color: #f9f9f9; border: 1px solid #ddd; padding: 20px;">
              <thead>
                <tr>
                  <th style="background-color: #4caf50; color: white; padding: 10px 0; text-align: center; font-size: 24px;">
                    Account Activate Request
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding: 20px;">
                    <p style="font-size: 16px; margin: 0;">
                      Hello <strong>${first_name}</strong>,
                    </p>
                    <p style="font-size: 16px;">
                      We received a request to activate your account. Click the button below to activate it:
                    </p>
                    <div style="text-align: center; margin: 20px 0;">
                      <a href="${activationUrl}" style="background-color: #4caf50; color: white; padding: 12px 24px; font-size: 16px; text-decoration: none; border-radius: 5px;">
                        Account Activate
                      </a>
                    </div>
                    <p style="font-size: 16px;">
                      If you didn’t request to activate your account, please ignore this email or contact support if you have any concerns.
                    </p>
                    <p style="font-size: 16px;">
                      Thank you,<br>
                      The Support Team
                    </p>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td style="background-color: #f0f0f0; padding: 10px 20px; text-align: center; font-size: 12px; color: #888;">
                    &copy; 2024 YourCompany, All rights reserved.
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        `,
      text: `Hello ${first_name},\n\nPlease activate your account by clicking the link below:\n\n${activationUrl}\n\nIf you did not request this, please ignore this email.\n\nThank you,\nThe Support Team`,
    });

    return res.status(201).json({
      success: true,
      message: `Please check your email (${email}) to activate your account!`,
    });
  } catch (error) {
    console.log(error.message);
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.addCustomer = async (req, res, next) => {
  try {
    const { first_name, last_name, email } = req.body;
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return next(new ErrorHandler("User already exists!", 400));
    }
    const newUser = await User.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      role: "customer",
      status: "active",
    });
    const notification = await Notification.create({
      admin_message: `${first_name} -  added as customer successfully`,
      read: false,
    });
    return res.status(201).json({
      success: true,
      message: `Customer Added Successfully!`,
    });
  } catch (error) {
    console.log(error.message);
    return next(new ErrorHandler(error.message, 500));
  }
};
const createActivationToken = (user) => {
  const payload = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
    password: user.password,
    profile_pic: user.profile_pic,
  };

  return jwt.sign(payload, process.env.ACTIVATE_SECRET, {
    expiresIn: process.env.EXPIRE_TIME,
  });
};
exports.activateUser = async (req, res, next) => {
  try {
    const { activation_token } = req.params;

    if (!activation_token) {
      return next(new ErrorHandler("JWT must be provided", 400));
    }

    const decoded = jwt.verify(activation_token, process.env.ACTIVATE_SECRET);

    if (!decoded) {
      return next(new ErrorHandler("Invalid or expired token", 401));
    }

    const { first_name, last_name, email, password, role, profile_pic } =
      decoded;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new ErrorHandler("User with this email already exists", 400));
    }

    const user = await User.create({
      first_name,
      last_name,
      email,
      password,
      role,
      profile_pic,
      status: "active",
      isVerified: true,
    });

    sendToken(user, 201, res);
  } catch (error) {
    console.log(error.message);
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res
      .status(400)
      .json({ error: "User with this email does not exist" });
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return res.status(400).json({ error: "Incorrect password" });
  }

  sendToken(user, 200, res);
});

exports.loadloggedinUser = catchAsyncError(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(new ErrorHandler("User not loggedin", 444));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error.message);
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User with this email does not exist", 404));
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  user.resetPasswordToken = resetPasswordToken;
  user.resetPasswordExpire = resetPasswordExpire;
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  try {
    await userMail({
      email: user.email,
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <table style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; background-color: #f9f9f9; border: 1px solid #ddd; padding: 20px;">
            <thead>
              <tr>
                <th style="background-color: #4caf50; color: white; padding: 10px 0; text-align: center; font-size: 24px;">
                  Password Reset Request
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 20px;">
                  <p style="font-size: 16px; margin: 0;">
                    Hello <strong>${user.first_name}</strong>,
                  </p>
                  <p style="font-size: 16px;">
                    We received a request to reset your password. Click the button below to reset it:
                  </p>
                  <div style="text-align: center; margin: 20px 0;">
                    <a
                      href="${resetUrl}"
                      style="background-color: #4caf50; color: white; padding: 12px 24px; font-size: 16px; text-decoration: none; border-radius: 5px;">
                      Reset Password
                    </a>
                  </div>
                  <p style="font-size: 16px;">
                    If you didn’t request a password reset, please ignore this email or contact support if you have any concerns.
                  </p>
                  <p style="font-size: 16px;">
                    Thank you,<br>
                    The Support Team
                  </p>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td style="background-color: #f0f0f0; padding: 10px 20px; text-align: center; font-size: 12px; color: #888;">
                  &copy; 2024 YourCompany, All rights reserved.
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      `,
      text: `Hello ${user.first_name},\n\nPlease reset your password by clicking the link below:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email.\n\nThank you,\nThe Support Team`,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Invalid or expired reset token", 400));
  }

  if (Date.now() > user.resetPasswordExpire) {
    return next(new ErrorHandler("Reset token has expired", 400));
  }

  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendToken(user, 200, res);
});

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error.message);
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.completeRegistration = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
      invitationToken: token,
      tokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token." });
    }

    user.password = password;
    user.status = "active";
    user.invitationToken = undefined;
    user.tokenExpiry = undefined;
    const notification = await Notification.create({
      userId: user._id,
      message: `Congratulation🎉! You has  successfully completed your registration and now you are a part of Stock Master Team`,
      admin_message: `${user.first_name} ${user.last_name} has successfully  completed his/her registeration`,
      read: false,
    });
    await user.save();

    res.status(200).json({ message: "Registration completed successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
  const userId = req.user && req.user._id;
  if (!userId) {
    return next(new ErrorHandler("User not authenticated", 401));
  }

  const updatedData = {
    first_name: req.body.first_name || req.user.first_name,
    last_name: req.body.last_name || req.user.last_name,
    email: req.body.email || req.user.email,
  };

  const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
    new: true,
    runValidators: true,
  });
  console.log("User ID from JWT:", userId);
  console.log("Data to be updated:", updatedData);

  res.status(200).json({
    success: true,
    user: updatedUser,
  });
});

exports.uploadProfilePicture = async (req, res) => {
  try {
    const { userId } = req.body; // Get the user ID from request body
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profile_pic = req.file.path; // Store the file path in the user model
    await user.save();

    res.status(200).json({
      message: "Profile picture uploaded successfully",
      profile_pic: user.profile_pic,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Current password is incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" + error.message });
  }
};

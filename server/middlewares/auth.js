const jwt = require("jsonwebtoken");
const User = require("./../models/user.js");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("./catchAsyncError.js");

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  console.log("Toekn" + token);

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 400));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded JWT:", decoded);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return next(new ErrorHandler("User not found", 404));
    }

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
});

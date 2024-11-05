const express = require("express");
const {
  preSignUp,
  activateUser,
  loginUser,
  resetPassword,
  forgotPassword,
  loadloggedinUser,
  logoutUser,
  completeRegistration,
  updateProfile,
  updateUserProfile,
  uploadProfilePicture,
  preSignUpCustomer,
  addCustomer,
  updatePassword,
} = require("../controllers/auth.js");
const { upload } = require("../multer");
const { isAuthenticated } = require("../middlewares/auth.js");
const {
  inviteUser,
  getUsers,
  getSuppliers,
  getCustomers,
  filterUsers,
  getUserDetails,
  updateUser,
  deletedUser,
} = require("../controllers/admin.js");
const {
  UploadProduct,
  getProducts,
  getProductById,
  filterProdcuts,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.js");
const {
  getAllMovements,
  recordMovement,
  getMovementById,
} = require("../controllers/movement");
const {
  createWarehouse,
  getAllWarehouse,
  deleteWarehouse,
  getWarehouseById,
  updateWarehouse,
} = require("../controllers/ware-house");
const {
  createStockAdjustement,
  getStockAdjustement,
} = require("../controllers/stock-adjustement");
const {
  UserNotification,
  readNotification,
  AdminNotification,
  fetchAdminNotification,
} = require("../controllers/notification");
const User = require("../models/user.js");
const {
  createOrder,
  fetchOrders,
  authUserOrders,
  updateOrderStatus,
} = require("../controllers/order.js");
const router = express.Router();

router.post("/create", upload.single("file"), preSignUp);
router.post("/create-customer", upload.single("file"), preSignUpCustomer);
router.post("/add-customer", addCustomer);
router.get("/activation/:activation_token", activateUser);
router.post("/login-user", loginUser);
router.get("/get-auth-user", isAuthenticated, loadloggedinUser);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);
router.post("/logout", isAuthenticated, logoutUser);
router.post("/complete-registration/:token", completeRegistration);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);
router.put("/update-profile", isAuthenticated, updateUserProfile);
router.put("/update-password" , isAuthenticated , updatePassword)
router.post(
  "/upload-profile-pic",
  upload.single("profile_pic"),
  isAuthenticated,
  uploadProfilePicture
);

// movements
router.get("/inventory-movements", isAuthenticated, getAllMovements);
router.post("/inventory/", isAuthenticated, recordMovement);
router.get("/inventory/:id", isAuthenticated, getMovementById);

//ProductRoutes
router.post(
  "/upload-product",
  upload.fields([
    { name: "main_image", maxCount: 1 },
    { name: "additional_images", maxCount: 10 },
    { name: "video_file", maxCount: 1 },
  ]),
  isAuthenticated,
  UploadProduct
);
router.get("/get-products", isAuthenticated, getProducts);
router.get("/product-details/:id", isAuthenticated, getProductById);
router.get("/products/search", isAuthenticated, filterProdcuts);
router.put("/update-product/:id", isAuthenticated, updateProduct);
router.delete("/delete-product/:id", isAuthenticated, deleteProduct);
//admin routes
router.post("/invite-user", isAuthenticated, inviteUser);
router.get("/get-users-record", isAuthenticated, getUsers);
router.get("/get-suppliers-record", isAuthenticated, getSuppliers);
router.get("/get-customers-record", isAuthenticated, getCustomers);
router.post("/create-ware-house", isAuthenticated, createWarehouse);
router.get("/ware-house-record", isAuthenticated, getAllWarehouse);
router.get("/ware-house-details/:id", isAuthenticated, getWarehouseById);
router.put("/update-ware-house/:id", isAuthenticated, updateWarehouse);
router.delete("/ware-house/:id", isAuthenticated, deleteWarehouse);
router.post(
  "/create-stock-adjustement",
  isAuthenticated,
  createStockAdjustement
);
router.get("/stock-adjustement-data", isAuthenticated, getStockAdjustement);
router.get("/users/search", isAuthenticated, filterUsers);
router.get("/user-details/:id", isAuthenticated, getUserDetails);
router.put("/update-user/:id", isAuthenticated, updateUser);
router.delete("/delete-user/:id", isAuthenticated, deletedUser);

// notification
router.get("/admin-notifications", fetchAdminNotification);
router.get("/notifications/:userId", isAuthenticated, UserNotification);
router.put("/notifications/read/:id", isAuthenticated, readNotification);

// orders
router.post("/create-order", createOrder);
router.get("/all-orders", isAuthenticated, fetchOrders);
router.get("/get-user-orders", isAuthenticated, authUserOrders);
router.put("/update-order-status", updateOrderStatus);
module.exports = router;

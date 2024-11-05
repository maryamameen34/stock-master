const Order = require("../models/order");
const Notification = require("../models/notification");
const User = require("../models/user"); // Import User model
const Product = require("../models/product"); // Import Product model

exports.createOrder = async (req, res) => {
  try {
    const { productId, quantity, userId } = req.body;

    // Fetch user and product details
    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res.status(404).json({ message: "User or Product not found" });
    }
    const newOrder = new Order({
      productId,
      quantity,
      userId,
      orderedAt: new Date(),
    });

    const notification = await Notification.create({
      userId: user._id,
      message: `You have successfully placed an order for ${quantity} ${product.title}(s).`,
      admin_message: `${user.first_name} ${user.last_name} has ordered ${quantity} ${product.title}(s).`,
      read: false,
    });
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to place order", error });
  }
};


exports.fetchOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "first_name email")
    .populate("productId", "title , salePrice ")
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
}

exports.authUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId }).populate("userId", "first_name email")
      .populate("productId", "title")
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user orders", error });
  }
}

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, newStatus } = req.body;
    console.log(orderId)
    console.log(newStatus)
    const order = await Order.findByIdAndUpdate(orderId, { status: newStatus }, { new: true });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status", error });
  }
};
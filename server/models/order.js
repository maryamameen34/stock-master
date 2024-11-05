


const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quantity: { type: Number, required: true },
  orderedAt: { type: Date, default: Date.now },
  status : {type  : String , enum : ['pending' , 'confirmed' , 'processing' , 'delivered' , 'completed' , 'cancelled' , 'on hold'] , default : "processing"}
});

module.exports = mongoose.model("Order", orderSchema);

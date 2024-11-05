const mongoose = require('mongoose');

const inventoryMovementSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  warehouseId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Warehouse' },
  type: { type: String, enum: ['inbound', 'outbound'], required: true },
  quantity: { type: Number, required: true },
  reason: { type: String, enum: ['purchase', 'sale', 'return', 'adjustment'], required: true },
  movementDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('InventoryMovement', inventoryMovementSchema);

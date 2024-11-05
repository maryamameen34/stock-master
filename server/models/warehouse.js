const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Warehouse', warehouseSchema);

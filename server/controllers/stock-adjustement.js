const stockAdjustement = require("../models/stock-adjustement");



exports.createStockAdjustement = async (req, res) => {
    try {
        const { productId, quantity, reason } = req.body;
        const stockAdjustment = new stockAdjustement({ productId, quantity, reason });
        await stockAdjustment.save();
        res.status(201).json(stockAdjustment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


exports.getStockAdjustement = async (req, res) => {
    try {
        const stockAdjustments = await stockAdjustement.find().populate('productId', 'title');
        res.status(200).json(stockAdjustments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

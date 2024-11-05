const Warehouse = require("../models/warehouse");



exports.createWarehouse = async (req, res) => {
    try {
        const warehouse = new Warehouse(req.body);
        await warehouse.save();
        res.status(201).json(warehouse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getAllWarehouse =  async (req, res) => {
    try {
        const warehouses = await Warehouse.find();
        res.json(warehouses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getWarehouseById = async (req, res) => {
    try {
        const warehouse = await Warehouse.findById(req.params.id);
        if (!warehouse) return res.status(404).json({ message: 'Warehouse not found' });
        res.json(warehouse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateWarehouse =  async (req, res) => {
    try {
        const warehouse = await Warehouse.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!warehouse) return res.status(404).json({ message: 'Warehouse not found' });
        res.json(warehouse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteWarehouse = async (req, res) => {
    try {
        const warehouse = await Warehouse.findByIdAndDelete(req.params.id);
        if (!warehouse) return res.status(404).json({ message: 'Warehouse not found' });
        res.json({ message: 'Warehouse deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const InventoryMovement = require('../models/movement.js');

exports.recordMovement = async (req, res) => {
  try {
    const movement = await InventoryMovement.create(req.body);
    res.status(201).json(movement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllMovements = async (req, res) => {
  try {
    const movements = await InventoryMovement.find();
    res.status(200).json(movements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMovementById = async (req, res) => {
  try {
    const movement = await InventoryMovement.findById(req.params.id);
    res.status(200).json(movement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

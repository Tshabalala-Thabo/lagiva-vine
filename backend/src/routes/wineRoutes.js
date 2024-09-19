import express from 'express';
import Wine from '../models/Wine.js';

const router = express.Router();

// Get all wines
router.get('/', async (req, res) => {
  try {
    const wines = await Wine.find();
    res.status(200).json(wines);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wines', error });
  }
});

// Add a new wine
router.post('/', async (req, res) => {
  const { name, type, price, image, description } = req.body;
  try {
    const newWine = new Wine({ name, type, price, image, description });
    await newWine.save();
    res.status(201).json({ message: 'Wine added successfully', wine: newWine });
  } catch (error) {
    res.status(400).json({ message: 'Error adding wine', error });
  }
});

// Get a wine by ID
router.get('/:id', async (req, res) => {
  try {
    const wine = await Wine.findById(req.params.id);
    if (!wine) return res.status(404).json({ message: 'Wine not found' });
    res.status(200).json(wine);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wine', error });
  }
});

// Update a wine by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedWine = await Wine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedWine) return res.status(404).json({ message: 'Wine not found' });
    res.status(200).json({ message: 'Wine updated successfully', wine: updatedWine });
  } catch (error) {
    res.status(400).json({ message: 'Error updating wine', error });
  }
});

// Delete a wine by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedWine = await Wine.findByIdAndDelete(req.params.id);
    if (!deletedWine) return res.status(404).json({ message: 'Wine not found' });
    res.status(200).json({ message: 'Wine deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting wine', error });
  }
});

export default router;
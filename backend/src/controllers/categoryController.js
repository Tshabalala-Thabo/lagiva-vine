import Category from '../models/Category.js';

// Create a new category
export const createCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).send(category);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).send(categories);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a category
export const updateCategory = async (req, res) => {
    const { id } = req.params; // Get the category ID from the request parameters
    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedCategory) {
            return res.status(404).send({ message: 'Category not found' });
        }
        res.status(200).send(updatedCategory);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a category
export const deleteCategory = async (req, res) => {
    const { id } = req.params; // Get the category ID from the request parameters
    try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).send({ message: 'Category not found' });
        }
        res.status(200).send({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};

// Additional methods can be added here
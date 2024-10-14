import Category from '../models/Category.js';

// Create a new category
export const createCategory = async (req, res) => {
    try {
        const categoryName = req.body.name.toLowerCase() // Convert name to lowercase
        const existingCategory = await Category.findOne({ name: categoryName }) // Check for existing category
        if (existingCategory) {
            return res.status(400).send('Category already exists') // Return specific message for duplicate key
        }

        const category = new Category({ ...req.body, name: categoryName }) // Create category with lowercase name
        await category.save()
        res.status(201).send({ message: 'Category created successfully', category }) // Return message and category
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error code
            return res.status(400).send('Category already exists') // Return specific message for duplicate key
        }
        res.status(400).send(error) // Handle other errors
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
    const { id } = req.params // Get the category ID from the request parameters
    try {
        const categoryName = req.body.name.toLowerCase() // Convert name to lowercase
        // Check for duplicate category name before updating
        const existingCategory = await Category.findOne({ name: categoryName })
        if (existingCategory && existingCategory._id.toString() !== id) {
            return res.status(400).send('Category already exists') // Return specific message for duplicate
        }

        const updatedCategory = await Category.findByIdAndUpdate(id, { ...req.body, name: categoryName }, { new: true, runValidators: true }) // Update with lowercase name
        if (!updatedCategory) {
            return res.status(404).send({ message: 'Category not found' })
        }
        res.status(200).send({ message: 'Category updated successfully', category: updatedCategory }) // Return message and updated category
    } catch (error) {
        res.status(400).send(error)
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

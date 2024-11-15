import Category from '../models/Category.js';

/**
 * Create a new category
 * @route POST /api/categories
 * @access Admin only
 */
export const createCategory = async (req, res) => {
    try {
        // Validate request body
        if (!req.body.name?.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Category name is required'
            });
        }

        const categoryName = req.body.name.toLowerCase().trim();
        
        // Check for existing category with case-insensitive search
        const existingCategory = await Category.findOne({
            name: { $regex: new RegExp(`^${categoryName}$`, 'i') }
        });

        if (existingCategory) {
            return res.status(409).json({
                success: false,
                message: 'Category already exists'
            });
        }

        // Create new category with sanitized data
        const category = new Category({
            name: categoryName,
            description: req.body.description?.trim(),
            createdBy: req.user._id // Assuming you have user info from auth middleware
        });

        await category.save();

        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: {
                id: category._id,
                name: category.name,
                description: category.description
            }
        });

    } catch (error) {
        console.error('Category creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating category'
        });
    }
};

/**
 * Get all categories with pagination and filtering
 * @route GET /api/categories
 * @access Public
 */
export const getCategories = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search?.trim();

        const query = {};
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const [categories, total] = await Promise.all([
            Category.find(query)
                .select('name description')
                .sort({ name: 1 })
                .skip((page - 1) * limit)
                .limit(limit),
            Category.countDocuments(query)
        ]);

        res.status(200).json({
            success: true,
            data: categories,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                hasMore: page * limit < total
            }
        });

    } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving categories'
        });
    }
};

/**
 * Update a category
 * @route PUT /api/categories/:id
 * @access Admin only
 */
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validate request body
        if (!req.body.name?.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Category name is required'
            });
        }

        const categoryName = req.body.name.toLowerCase().trim();

        // Check for existing category with same name but different ID
        const existingCategory = await Category.findOne({
            name: { $regex: new RegExp(`^${categoryName}$`, 'i') },
            _id: { $ne: id }
        });

        if (existingCategory) {
            return res.status(409).json({
                success: false,
                message: 'Category name already exists'
            });
        }

        // Update category with sanitized data
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            {
                name: categoryName,
                description: req.body.description?.trim(),
                updatedBy: req.user._id,
                updatedAt: Date.now()
            },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            data: {
                _id: updatedCategory._id,
                name: updatedCategory.name,
                description: updatedCategory.description
            }
        });

    } catch (error) {
        console.error('Update category error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating category'
        });
    }
};

/**
 * Delete a category
 * @route DELETE /api/categories/:id
 * @access Admin only
 */
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Optional: Check if category is being used by products
        // const isInUse = await checkCategoryInUse(id);
        // if (isInUse) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Cannot delete category as it is being used by products'
        //     });
        // }

        const deletedCategory = await Category.findByIdAndDelete(id);
        
        if (!deletedCategory) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Category deleted successfully'
        });

    } catch (error) {
        console.error('Delete category error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting category'
        });
    }
};
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true,
        lowercase: true,
        unique: true,
        index: true
    },
    description: {
        type: String,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// Create text index for search
categorySchema.index({ name: 'text', description: 'text' });

// Add a pre-save hook to ensure name uniqueness case-insensitively
categorySchema.pre('save', async function(next) {
    if (this.isModified('name')) {
        const existingCategory = await this.constructor.findOne({
            name: { $regex: new RegExp(`^${this.name}$`, 'i') },
            _id: { $ne: this._id }
        });
        
        if (existingCategory) {
            next(new Error('Category name already exists'));
        }
    }
    next();
});

export default mongoose.model('Category', categorySchema);
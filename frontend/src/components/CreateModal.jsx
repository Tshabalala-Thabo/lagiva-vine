import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CreateModal = ({ isOpen, onClose, onSubmit, formFields, heading, initialData }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        // Initialize form data based on the fields provided
        const initialDataState = {};
        formFields.forEach(field => {
            initialDataState[field.name] = initialData ? initialData[field.name] : ''; // Populate with initial data if available
        });
        setFormData(initialDataState);
    }, [formFields, initialData, isOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose(); // Close the modal after submission
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center z-50"
                        initial={{ opacity: 0, scale: 0.8 }} // Initial state
                        animate={{ opacity: 1, scale: 1 }} // Animate to this state
                        exit={{ opacity: 0, scale: 0.8 }} // Exit state
                        transition={{ duration: 0.3 }} // Transition duration
                    >
                        <div className="bg-white p-8 rounded shadow-md w-1/3"> {/* Adjusted width and padding */}
                            <h2 className="text-lg font-bold">{heading}</h2>
                            <form onSubmit={handleSubmit}>
                                {formFields.map((field) => (
                                    <div key={field.name} className="mb-4">
                                        <label className="block mb-1" htmlFor={field.name}>{field.label}</label>
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={formData[field.name] || ''} // Ensure value is set correctly
                                            onChange={handleInputChange}
                                            placeholder={field.placeholder}
                                            required={field.required}
                                            className="border p-2 w-full"
                                        />
                                    </div>
                                ))}
                                <div className="flex justify-end">
                                    <button
                                        className="bg-gray-300 px-4 py-2 rounded mr-2"
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CreateModal;

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
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
                        <div className="bg-white p-6 rounded shadow-md">
                            <h2 className="text-lg font-bold">Confirm Deletion</h2>
                            <p>Are you sure you want to delete this category?</p>
                            <div className="mt-4">
                                <button 
                                    className="bg-red-500 text-white px-4 py-2 rounded mr-2" 
                                    onClick={onConfirm}
                                >
                                    Yes, Delete
                                </button>
                                <button 
                                    className="bg-gray-300 px-4 py-2 rounded" 
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ConfirmDeleteModal;

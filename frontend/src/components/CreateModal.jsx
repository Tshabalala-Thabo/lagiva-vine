import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SubmitButton from './SubmitButton' // Import the new SubmitButton component

const CreateModal = ({ isOpen, onClose, onSubmit, formFields, heading, initialData }) => {
    const [formData, setFormData] = useState({})
    const [localData, setLocalData] = useState({})
    const [loading, setLoading] = useState(false) // New loading state

    useEffect(() => {
        if (isOpen) {
            const initialDataState = {};
            formFields.forEach(field => {
                initialDataState[field.name] = initialData ? initialData[field.name] : ''
            })
            setFormData(initialDataState)
            setLocalData(initialDataState)
        }
    }, [formFields, initialData, isOpen])

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target
        setLocalData(prevData => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true) // Set loading to true when submission starts
        setFormData(localData)
        try {
            await onSubmit(localData); // Await the submission
            handleClose(); // Close the modal only if submission is successful
        } catch (error) {
            console.error("Submission failed:", error) // Handle error if needed
        } finally {
            setLoading(false) // Reset loading state
        }
    }

    const handleClose = useCallback(() => {
        setLocalData(formData)
        onClose()
    }, [formData, onClose])

    useEffect(() => {
        if (!isOpen) {
            setLocalData(formData)
        }
    }, [isOpen, formData])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center z-50"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="bg-white p-8 rounded shadow-md w-1/3">
                            <h2 className="text-lg font-bold mb-4">{heading}</h2>
                            <form onSubmit={handleSubmit}>
                                {formFields.map((field) => (
                                    <div key={field.name} className="mb-4">
                                        <label className="block mb-1" htmlFor={field.name}>{field.label}</label>
                                        {field.type === 'file' ? (
                                            <div>
                                                <input
                                                    type="file"
                                                    name={field.name}
                                                    onChange={handleInputChange}
                                                    required={field.required}
                                                    className="border p-2 w-full"
                                                />
                                                {localData[field.name] && <p className="mt-1 text-gray-600">{localData[field.name].name}</p>}
                                            </div>
                                        ) : (
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                value={localData[field.name] || ''}
                                                onChange={handleInputChange}
                                                placeholder={field.placeholder}
                                                required={field.required}
                                                className="border p-2 w-full"
                                            />
                                        )}
                                    </div>
                                ))}
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="bg-gray-300 px-4 py-2 rounded mr-2"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </button>
                                    <SubmitButton loading={loading} text="Save" width="w-20" /> {/* Pass the desired button width */}
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CreateModal

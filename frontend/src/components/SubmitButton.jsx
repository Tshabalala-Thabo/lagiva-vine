import React from 'react'
import { PulseLoader } from 'react-spinners' // Updated to import PulseLoader

const SubmitButton = ({ loading, text = 'Submit', width = 'w-24', onClick }) => ( // Added width prop with default value and onClick prop
    <button
        type="button" // Ensure this is set to "button" to prevent form submission
        className={`bg-blue-primary text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${width}`} // Use the width prop
        disabled={loading} // Disable button while loading
        onClick={onClick} // Ensure onClick is passed to the button
    >
        {loading ? (
            <PulseLoader size={10} color={"#ffffff"} loading={loading} /> // Updated to use PulseLoader
        ) : (
            text // Use the text prop instead of hardcoded 'Submit'
        )}
    </button>
)

export default SubmitButton

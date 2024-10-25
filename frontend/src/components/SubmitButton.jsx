import React from 'react'
import { PulseLoader } from 'react-spinners' // Updated to import PulseLoader

const SubmitButton = ({ loading, text = 'Submit', width = 'w-24' }) => ( // Added width prop with default value
    <button
        type="submit"
        className={`bg-blue-primary text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${width}`} // Use the width prop
        disabled={loading} // Disable button while loading
    >
        {loading ? (
            <PulseLoader size={10} color={"#ffffff"} loading={loading} /> // Updated to use PulseLoader
        ) : (
            text // Use the text prop instead of hardcoded 'Submit'
        )}
    </button>
)

export default SubmitButton

import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader' // Import the spinner

const SubmitButton = ({ loading }) => (
    <button
        type="submit"
        className={`bg-blue-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''} w-24`} // Fixed width
        disabled={loading} // Disable button while loading
    >
        {loading ? (
            <ClipLoader size={20} color={"#ffffff"} loading={loading} /> // Spinner component
        ) : (
            'Submit'
        )}
    </button>
)

export default SubmitButton

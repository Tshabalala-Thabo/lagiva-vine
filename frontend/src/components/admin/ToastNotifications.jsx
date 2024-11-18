import React from 'react';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications

const ToastNotifications = () => {
    return (
        <ToastContainer position="bottom-right" autoClose={3000} /> // Position the toast at the bottom right and set autoClose to 3 seconds
    );
};

export default ToastNotifications;

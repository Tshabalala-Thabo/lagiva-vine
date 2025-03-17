import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Access from .env file
  withCredentials: false, // Include credentials in requests
  headers: {
    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.content,
  },
});

export default axiosInstance;


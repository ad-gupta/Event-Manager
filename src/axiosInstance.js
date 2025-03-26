import axios from "axios";

// Create an instance of axios

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000
});

export default axiosInstance
import axios from "axios";

// Create an instance of axios

const axiosInstance = axios.create({
  baseURL: "https://eventserver-fvgw.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000
});

export default axiosInstance
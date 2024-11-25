import axios from "axios";

//create a axios instance

const axiosInstance = axios.create({
  baseURL: import.meta.mode === "development" ? "http://localhost:5000/api" : "/api",
  withCredentials: true, // to send cookies with requests to the backend
});

export default axiosInstance;
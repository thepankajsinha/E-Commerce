import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

//create a axios instance

const axiosInstance = axios.create({
  baseURL: import.meta.env.BACKEND_URL,
  withCredentials: true, // to send cookies with requests to the backend
});

export default axiosInstance;
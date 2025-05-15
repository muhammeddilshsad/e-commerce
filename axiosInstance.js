import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));
const token = user?.token;


export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`
  }
});

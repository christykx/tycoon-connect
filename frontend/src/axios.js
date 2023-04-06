import axios from "axios";


export const makeRequest = axios.create({
             
    baseURL:"http://localhost:3001",
    // "https://tycoonconnectapi.onrender.com",
    withCredentials:true
})
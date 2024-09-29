import axios from 'axios';
import {BASE_URL} from "@/utils/index.jsx";

export const login = async (data) => {
    return await axios.post(BASE_URL + "/auth/login", data, { withCredentials: true });
}

export const register = async (data) => {
    return await axios.post(BASE_URL + "/auth/register", data, { withCredentials: true });
}

export const logout = async () => {
    return await axios.get(BASE_URL + "/auth/logout", { withCredentials: true });
}

export const authChecking = async () => {
    return await axios.get(BASE_URL + "/auth/auth-check", { withCredentials: true });
}
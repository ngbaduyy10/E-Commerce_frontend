import axios from 'axios';
import {BASE_URL} from "@/utils/index.jsx";

export const getAddress = async (id) => {
    const response = await axios.get(BASE_URL + "/address/" + id, { withCredentials: true });
    return response.data;
}

export const addAddress = async (data) => {
    const response = await axios.post(
        `${BASE_URL}/address/add`,
        data,
        {
            headers: {
                "Content-Type": "application/json"
            },
        });
    return response.data;
}

export const updateAddress = async (id, data) => {
    const response = await axios.patch(
        `${BASE_URL}/address/update/${id}`,
        data,
        {
            headers: {
                "Content-Type": "application/json"
            },
        });
    return response.data;
}

export const deleteAddress = async (id) => {
    const response = await axios.delete(`${BASE_URL}/address/delete/${id}`, { withCredentials: true });
    return response.data;
}
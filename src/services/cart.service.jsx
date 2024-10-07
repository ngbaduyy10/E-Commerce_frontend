import axios from 'axios';
import { BASE_URL } from "@/utils/index.jsx";

export const getCart = async (id) => {
    const response = await axios.get(`${BASE_URL}/cart/${id}`);
    return response.data;
}

export const addToCart = async (data) => {
    const response = await axios.post(
        `${BASE_URL}/cart/add`,
        data,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return response.data;
}

export const updateCart = async (data) => {
    const response = await axios.patch(
        `${BASE_URL}/cart/update`,
        data,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return response.data;
}

export const deleteCart = async (data) => {
    const response = await axios.patch(
        `${BASE_URL}/cart/delete`,
        data,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    return response.data;
}
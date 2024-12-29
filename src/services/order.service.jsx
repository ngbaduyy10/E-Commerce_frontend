import axios from 'axios';
import {BASE_URL} from "@/utils/index.jsx";

export const getOrders = async () => {
    const response = await axios.get(BASE_URL + "/order", { withCredentials: true });
    return response.data;
}

export const getOrdersByUserId = async (id) => {
    const response = await axios.get(BASE_URL + "/order/" + id, { withCredentials: true });
    return response.data;
}

export const getOrderDetail = async (id) => {
    const response = await axios.get(BASE_URL + "/order/detail/" + id, { withCredentials: true });
    return response.data;
}

export const createOrder = async (data) => {
    const response = await axios.post(
        `${BASE_URL}/order/create`,
        data,
        {
            headers: {
                "Content-Type": "application/json"
            },
        });
    return response.data;
}

export const updateOrderStatus = async (id, data) => {
    const response = await axios.patch(
        `${BASE_URL}/order/update/${id}`,
        data,
        {
            headers: {
                "Content-Type": "application/json"
            },
        });
    return response.data;
}
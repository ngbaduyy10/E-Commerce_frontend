import axios from 'axios';
import {BASE_URL} from "@/utils/index.jsx";

export const getProducts = async (data) => {
    const response = await axios.post(
        BASE_URL + "/product",
        data,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return response.data;
}

export const createProduct = async (data) => {
    const response = await axios.post(
        BASE_URL + "/product/create",
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );
    return response.data;
}

export const updateProduct = async (id, data) => {
    const response = await axios.patch(
        BASE_URL + "/product/update/" + id,
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );
    return response.data;
}

export const deleteProduct = async (id) => {
    const response = await axios.patch(BASE_URL + "/product/delete/" + id);
    return response.data;
}
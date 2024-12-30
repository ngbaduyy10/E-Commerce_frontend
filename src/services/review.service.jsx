import axios from 'axios';
import { BASE_URL } from '../utils/index.jsx';

export const getReviews = async (productId) => {
    const response = await axios.get(`${BASE_URL}/review/${productId}`);
    return response.data;
}

export const addReview = async (data) => {
    const response = await axios.post(
        `${BASE_URL}/review/add`,
        data,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return response.data;
}
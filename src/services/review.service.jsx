import axios from 'axios';
import { BASE_URL } from '../utils/index.jsx';

export const getReviews = async (productId) => {
    const response = await axios.get(`${BASE_URL}/review/${productId}`);
    return response.data;
}
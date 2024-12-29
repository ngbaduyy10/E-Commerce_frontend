import axios from 'axios';
import { BASE_URL } from '../utils/index.jsx';

export const searchProducts = async (keyword) => {
    const response = await axios.get(`${BASE_URL}/search/${keyword}`);
    return response.data;
}
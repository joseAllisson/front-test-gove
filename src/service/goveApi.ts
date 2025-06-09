import axios from 'axios';

const goveApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:700/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default goveApi;
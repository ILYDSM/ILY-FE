import { getItem } from '@/utils/AsyncStorage';
import axios, { AxiosError } from 'axios';

export const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
});

instance.interceptors.request.use(
  async (request) => {
    const accessToken = await getItem('access_token');
    if (accessToken) {
      request.headers!['Authorization'] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

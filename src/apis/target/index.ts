import { getItem } from '@/utils/AsyncStorage';
import { instance } from '../axios';

const router = '/target';

export const createMandalArt = async (body: CreateMandalArtRequest) => {
  const accessToken = await getItem('access_token');
  return await instance.post(`${router}`, body, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
};
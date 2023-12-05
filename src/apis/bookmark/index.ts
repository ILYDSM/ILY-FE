import { getItem } from '@/utils/AsyncStorage';
import { instance } from '../axios';

const router = '/bookmark';

export const createBookMark = async (meet_id: string) => {
  const accessToken = await getItem('access_token');
  return await instance.patch(`${router}/${meet_id}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
};

export const deleteBookMark = async (meet_id: string) => {
  const accessToken = await getItem('access_token');
  return await instance.patch(`${router}/clear/${meet_id}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
};

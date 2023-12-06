import { getItem } from '@/utils/AsyncStorage';
import { instance } from '../axios';

const router = '/bookmark';

export const createBookMark = async (meet_id: string) => {
  const accessToken = await getItem('access_token');
  return await instance({
    url: `${router}/${meet_id}`,
    method: 'patch',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
};

export const deleteBookMark = async (meet_id: string) => {
  const accessToken = await getItem('access_token');
  return await instance({
    url: `${router}/clear/${meet_id}`,
    method: 'patch',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
};

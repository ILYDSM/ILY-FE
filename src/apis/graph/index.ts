import { getItem } from '@/utils/AsyncStorage';
import { instance } from '../axios';

const router = '/graph';

export const weekGraph = async () => {
  const accessToken = await getItem('access_token');
  return await instance.get<WeekGraphResponse>(`${router}/week`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
};

export const graph = async () => {
  const accessToken = await getItem('access_token');
  return await instance.get<GraphResponse[]>(`${router}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
};
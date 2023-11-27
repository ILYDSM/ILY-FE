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

export const getTarget = async () => {
  const accessToken = await getItem('access_token');
  return await instance.get<GetTargetResponse[]>(`${router}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
};

export const getMandalArt = async (body: GetMandalArtRequest) => {
  const accessToken = await getItem('access_token');
  return await instance.get<GetMandalArtResponse>(`${router}/${body.targetId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
}
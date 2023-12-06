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

export const editMandalArt = async (targetId: string, body: CreateMandalArtRequest) => {
  const accessToken = await getItem('access_token');
  return await instance.patch(`${router}/${targetId}`, body, {
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

export const getMeetMandalArt = async (body: GetMandalArtRequest) => {
  const accessToken = await getItem('access_token');
  return await instance.get<GetMandalArtResponse>(`${router}/meet/${body.targetId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
}

export const getDetailMandalArt = async (body: GetMandalArtRequest) => {
  const accessToken = await getItem('access_token');
  return await instance.get<GetDetailMandalArtResponse>(`${router}/sub/${body.targetId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
}

export const completeMandalArt = async (body: completeMandalArtRequest) => {
  const accessToken = await getItem('access_token');
  return instance({
    url: `${router}/detail/${body.detailTargetId}`,
    method: 'patch',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
}
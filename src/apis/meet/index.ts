import { getItem } from '@/utils/AsyncStorage';
import { instance } from '../axios';

const router = '/meet';

export const createGroup = async (body: CreateGroupRequest) => {
  const accessToken = await getItem('access_token');
  return await instance.post(`${router}`, body, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
};

export const editGroup = async (body: EditGroupRequest, meet_id: string) => {
  const accessToken = await getItem('access_token');
  return await instance.patch(`${router}/${meet_id}`, body, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
};

export const deleteGroup = async (meet_id: string) => {
  const accessToken = await getItem('access_token');
  return await instance.delete(`${router}/${meet_id}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
};

export const viewAllGroup = async () => {
  const accessToken = await getItem('access_token');
  return await instance.get<ViewAllResponse[]>(`${router}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
};

export const viewDetailGroup = async (meet_id: string) => {
  const accessToken = await getItem('access_token');
  return await instance.get<ViewDetailResponse>(`${router}/${meet_id}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
};

export const viewCategoryGroup = async (type: InterestEnglishType) => {
  const accessToken = await getItem('access_token');
  return await instance({ url: `${router}/category`, params: { type }, headers: { 'Authorization': `Bearer ${accessToken}` } });
};

export const viewCategorySearchGroup = async (body: ViewCategorySearchGroup) => {
  const accessToken = await getItem('access_token');
  return await instance({ url: `${router}/category/search`, params: { type: body.type, keyword: body.keyword }, headers: { 'Authorization': `Bearer ${accessToken}` } });
};

export const exitGroup = async (meet_id: string) => {
  const accessToken = await getItem('access_token');
  return await instance.patch(`${router}/withdraw${meet_id}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
};

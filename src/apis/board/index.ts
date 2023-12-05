import { getItem } from '@/utils/AsyncStorage';
import { instance } from '../axios';

const router = '/board';

export const createBoard = async (body: CreateBoardRequest, meet_id: string) => {
  const accessToken = await getItem('access_token');
  return await instance.patch(`${router}/${meet_id}`, body, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
};

export const editBoard = async (body: EditBoardRequest, board_id: string) => {
  const accessToken = await getItem('access_token');
  return await instance.put(`${router}/${board_id}`, body, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
};

export const detailBoard = async (board_id: string) => {
  const accessToken = await getItem('access_token');
  return await instance.delete(`${router}/${board_id}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
};

export const viewDetailBoard = async (meet_id: string) => {
  const accessToken = await getItem('access_token');
  return await instance.get<viewDetailBoardResponse[]>(`${router}/${meet_id}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
};

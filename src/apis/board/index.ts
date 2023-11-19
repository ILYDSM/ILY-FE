import { instance } from '../axios';

const router = '/board';

export const createBoard = async (body: CreateBoardRequest, meet_id: string) => {
  return await instance.patch(`${router}/${meet_id}`, body);
};

export const editBoard = async (body: EditBoardRequest, board_id: string) => {
  return await instance.put(`${router}/${board_id}`, body);
};

export const detailBoard = async (board_id: string) => {
  return await instance.delete(`${router}/${board_id}`);
};

export const viewDetailBoard = async (meet_id: string) => {
  return await instance.get(`${router}/${meet_id}`);
};

import { instance } from '../axios';

const router = '/bookmark';

export const createBookMark = async (meet_id: string) => {
  return await instance.patch(`${router}/${meet_id}`);
};

export const deleteBookMark = async (meet_id: string) => {
  return await instance.patch(`${router}/clear/${meet_id}`);
};

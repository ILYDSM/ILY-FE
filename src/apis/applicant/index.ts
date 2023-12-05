import { instance } from '../axios';

const router = '/applicant';

export const applyGroup = async (meet_id: number) => {
  return await instance.post(`${router}/${meet_id}`);
};

export const getApplyList = async (meet_id: string) => {
  return await instance.get<GetApplyListResponse[]>(`${router}/${meet_id}`);
};

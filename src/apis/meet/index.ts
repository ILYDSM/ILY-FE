import { instance } from '../axios';

const router = '/meet';

export const createGroup = async (body: CreateGroupRequest) => {
  return await instance.post(`${router}`, body);
};

export const editGroup = async (body: EditGroupRequest, meet_id: string) => {
  return await instance.patch(`${router}/${meet_id}`, body);
};

export const deleteGroup = async (meet_id: string) => {
  return await instance.delete(`${router}/${meet_id}`);
};

export const viewAllGroup = async () => {
  return await instance.get<ViewAllResponse[]>(`${router}`);
};

export const viewDetailGroup = async (meet_id: string) => {
  return await instance.get<ViewDetailResponse>(`${router}/${meet_id}`);
};

export const viewCategoryGroup = async (type: InterestEnglishType) => {
  return await instance({ url: `${router}/category`, params: { type } });
};

export const viewCategorySearchGroup = async (body: ViewCategorySearchGroup) => {
  return await instance({ url: `${router}/category/search`, params: { type: body.type, keyword: body.keyword } });
};

export const exitGroup = async (meet_id: string) => {
  return await instance.patch(`${router}/withdraw${meet_id}`);
};

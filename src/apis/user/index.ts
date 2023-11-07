import { instance } from '../axios';

const router = '/user';

export const login = async (body: LoginRequest) => {
  return await instance.post<LoginResponse>(`${router}`, body);
};

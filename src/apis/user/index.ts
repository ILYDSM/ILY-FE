import { instance } from '../axios';

const router = '/user';

export const login = async (body: LoginRequest) => {
  return await instance.post<LoginResponse>(`${router}/auth`, body);
};

export const signUp = async (body: SignUpRequest) => {
  return await instance.post(`${router}`, body);
};

export const profile = async () => {
  return await instance.get<ProfileResponse>(`${router}/profile`);
};

export const interest = async (body: InterestRequest) => {
  return await instance.post(`${router}/interest`, body);
}
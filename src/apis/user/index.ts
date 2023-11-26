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

export const passwordChange = async (body: PasswordChangeRequest) => {
  return await instance.patch(`${router}/password`, body);
}

export const profileChange = async (body: ProfileChangeRequest) => {
  return await instance.patch(`${router}/profile`, body);
}

export const deleteAccount = async () => {
  return await instance.delete(`${router}`);
}

export const logout = async () => {
  return await instance.delete(`${router}/logout`);
}
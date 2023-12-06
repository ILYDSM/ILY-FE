import { getItem } from '@/utils/AsyncStorage';
import { instance } from '../axios';

const router = '/user';

export const login = async (body: LoginRequest) => {
  return await instance.post<LoginResponse>(`${router}/auth`, body);
};

export const signUp = async (body: SignUpRequest) => {
  return await instance.post(`${router}`, body);
};

export const profile = async () => {
  const accessToken = await getItem('access_token');
  return await instance.get<ProfileResponse>(`${router}/profile`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
};

export const interest = async (body: InterestRequest) => {
  const accessToken = await getItem('access_token');
  return await instance({
    url: `${router}/interest`,
    method: 'patch',
    data: body,
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
}

export const passwordChange = async (body: PasswordChangeRequest) => {
  const accessToken = await getItem('access_token');
  return await instance({
    url: `${router}/password`,
    method: 'patch',
    data: body,
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
}

export const profileChange = async (body: ProfileChangeRequest) => {
  const accessToken = await getItem('access_token');
  return await instance({
    url: `${router}/profile`,
    method: 'patch',
    data: body,
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
}

export const deleteAccount = async () => {
  const accessToken = await getItem('access_token');
  return await instance.delete(`${router}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
}

export const logout = async () => {
  const accessToken = await getItem('access_token');
  return await instance.delete(`${router}/logout`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
}
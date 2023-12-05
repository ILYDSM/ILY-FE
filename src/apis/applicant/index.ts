import { getItem } from '@/utils/AsyncStorage';
import { instance } from '../axios';

const router = '/applicant';

export const applicantMeet = async (meet_id: number) => {
  const accessToken = await getItem('access_token');
  return await instance.get<applicantMeetResponse[]>(`${router}/${meet_id}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
};

export const requestApplicantMeet = async (meet_id: string) => {
  const accessToken = await getItem('access_token');
  return await instance.post(`${router}/${meet_id}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
};

export const approveApplicantMeet = async (meet_id: number, user_id: number, approve: boolean) => {
  const accessToken = await getItem('access_token');
  return await instance({
    url: `${router}/${meet_id}/${user_id}`,
    method: 'patch',
    params: { approve },
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
};
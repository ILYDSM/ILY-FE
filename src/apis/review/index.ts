import { getItem } from '@/utils/AsyncStorage';
import { instance } from '../axios';

const router = '/Review';

export const createReview = async (body: CreateReviewRequest, meet_id: string) => {
  const accessToken = await getItem('access_token');
  return await instance.patch(`${router}/${meet_id}`, body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const editReview = async (body: EditReviewRequest, review_id: string) => {
  const accessToken = await getItem('access_token');
  return await instance.put(`${router}/${review_id}`, body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const detailReview = async (review_id: string) => {
  const accessToken = await getItem('access_token');
  return await instance.delete(`${router}/${review_id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const viewReview = async (meet_id: number) => {
  const accessToken = await getItem('access_token');
  return await instance.get(`${router}/${meet_id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

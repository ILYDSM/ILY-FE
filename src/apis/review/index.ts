import { instance } from '../axios';

const router = '/Review';

export const createReview = async (body: CreateReviewRequest, meet_id: string) => {
  return await instance.patch(`${router}/${meet_id}`, body);
};

export const editReview = async (body: EditReviewRequest, review_id: string) => {
  return await instance.put(`${router}/${review_id}`, body);
};

export const detailReview = async (review_id: string) => {
  return await instance.delete(`${router}/${review_id}`);
};

export const viewReview = async (meet_id: string) => {
  return await instance.get(`${router}/${meet_id}`);
};

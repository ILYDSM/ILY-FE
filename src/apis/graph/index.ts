import { instance } from '../axios';

const router = '/graph';

export const weekGraph = async () => {
  return await instance.get<WeekGraphResponse>(`${router}/week`);
};

export const graph = async () => {
  return await instance.get<GraphResponse[]>(`${router}`);
};
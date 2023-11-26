import { instance } from '../axios';

const router = '/target';

export const createMandalArt = async (body: CreateMandalArtRequest) => {
  return await instance.post(`${router}`, body);
};
import Axios from 'axios';
import { api } from '.';

export const getIsAlive = async (): Promise<boolean> => {
  const {
    data: { status },
  } = await Axios.get(api.ping);

  return Boolean(status);
};

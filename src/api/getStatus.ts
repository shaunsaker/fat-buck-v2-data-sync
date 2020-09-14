import Axios from 'axios';
import { api } from '.';
import { getApiEndpoint } from './getApiEndpoint';

// TODO: what is the return type
export const getStatus = async (accessToken: string): Promise<any[]> => {
  const data = await getApiEndpoint<any[]>(api.status, accessToken);
  return data;
};

import { api } from '.';
import { getApiEndpoint } from './getApiEndpoint';
import { Profit } from './models';

export const getCount = async (accessToken: string): Promise<Profit> => {
  const data = await getApiEndpoint<Profit>(api.count, accessToken);
  return data;
};

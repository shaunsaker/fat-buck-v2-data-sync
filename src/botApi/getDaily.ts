import { api } from '.';
import { getApiEndpoint } from './getApiEndpoint';
import { Profit } from './models';

export const getDaily = async (accessToken: string): Promise<Profit> => {
  const data = await getApiEndpoint<Profit>(api.daily, accessToken);
  return data;
};

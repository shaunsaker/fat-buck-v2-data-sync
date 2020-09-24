import { api } from '.';
import { getApiEndpoint } from './getApiEndpoint';
import { Profit } from './models';

export const getPerformance = async (accessToken: string): Promise<Profit> => {
  const data = await getApiEndpoint<Profit>(api.performance, accessToken);
  return data;
};

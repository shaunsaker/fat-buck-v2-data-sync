import { api } from '.';
import { getApiEndpoint } from './getApiEndpoint';
import { Profit } from './models';

export const getProfit = async (accessToken: string): Promise<Profit> => {
  const data = await getApiEndpoint<Profit>(api.profit, accessToken);
  return data;
};

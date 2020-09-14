import { api } from '.';
import { getApiEndpoint } from './getApiEndpoint';
import { Balance } from './models';

export const getBalance = async (accessToken: string): Promise<Balance> => {
  const data = await getApiEndpoint<Balance>(api.balance, accessToken);
  return data;
};

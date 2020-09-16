import { api } from '.';
import { getApiEndpoint } from './getApiEndpoint';
import { Trades } from './models';

export const getOpenTrades = async (accessToken: string): Promise<any[]> => {
  const data = await getApiEndpoint<Trades[] | undefined>(
    api.status,
    accessToken,
  );
  return data || [];
};

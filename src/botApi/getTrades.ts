import { api } from '.';
import { getApiEndpoint } from './getApiEndpoint';
import { Trades } from './models';

export const getTrades = async (accessToken: string): Promise<Trades> => {
  const { trades } = await getApiEndpoint<{ trades: Trades }>(
    api.trades,
    accessToken,
  );
  return trades;
};

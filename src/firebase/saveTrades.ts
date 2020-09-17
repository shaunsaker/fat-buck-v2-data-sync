import * as camelcaseKeys from 'camelcase-keys';
import { firebase } from '.';
import { Trades, Trade } from '../api/models';
import { getDate } from '../utils/getDate';

const getTradeId = (trade: Trade): string => {
  const coin = trade.pair.split('/')[0];
  const tradeId = `${trade.open_timestamp}-${coin}`; // we can't use trade_id because the local db might be reset and it might reset the trade ids (they use indexes, 1 to n), this should be unique enough
  return tradeId;
};

export const saveTrades = async (
  trades: Trades,
  activeBotId: string,
): Promise<void> => {
  const date = getDate();
  const tradesRef = firebase
    .firestore()
    .collection('bots')
    .doc(activeBotId)
    .collection('trades');

  for (const trade of trades) {
    const id = getTradeId(trade);
    const existingTrade = (await tradesRef.doc(id).get()).data() as
      | { closeTimestamp: number }
      | undefined;
    const tradeExists = existingTrade?.closeTimestamp;

    if (!tradeExists) {
      const parsedTrade = camelcaseKeys(trade);
      await tradesRef.doc(id).set({
        ...parsedTrade,
        dateAdded: date,
      });
    }
  }
};

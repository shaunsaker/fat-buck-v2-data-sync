import * as camelcaseKeys from 'camelcase-keys';
import { firebase } from '.';
import { Trades, Trade } from '../api/models';
import { getDate } from '../utils/getDate';

// CFO: if there are multiple bots placing the same trades at the same time, this id won't work - suggest we get the bot name somehow and attach that
const getTradeId = (trade: Trade): string => {
  const coin = trade.pair.split('/')[0];
  const tradeId = `${trade.open_timestamp}-${coin}`; // we can't use trade_id because the local db might be reset, this should be unique enough
  return tradeId;
};

export const saveTrades = async (trades: Trades): Promise<void> => {
  const date = getDate();
  const tradesRef = firebase.firestore().collection('trades');

  for (const trade of trades) {
    const id = getTradeId(trade);
    const tradeExists = await (await tradesRef.doc(id).get()).exists;

    if (!tradeExists) {
      const parsedTrade = camelcaseKeys(trade);
      await tradesRef.doc(id).set({
        ...parsedTrade,
        dateAdded: date,
      });
    }
  }
};

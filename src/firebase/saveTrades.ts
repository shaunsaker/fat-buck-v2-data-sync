import * as camelcaseKeys from 'camelcase-keys';
import { firebase } from '.';
import { Trades, Trade, ParsedTrades } from '../botApi/models';
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

  const existingTrades = (await (await tradesRef.get()).docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))) as ParsedTrades;

  for (const trade of trades) {
    const id = getTradeId(trade);
    const tradeExists = existingTrades.some(
      (trade) => trade.id === id && trade.closeTimestamp,
    );

    if (!tradeExists) {
      const parsedTrade = camelcaseKeys(trade);
      await tradesRef.doc(id).set({
        ...parsedTrade,
        dateAdded: date,
      });
    }
  }

  // if an open trade with no feeOpenCost is in Firestore and is no longer in trades, assume it was cancelled and remove it from Firestore
  for (const existingTrade of existingTrades) {
    if (
      existingTrade.isOpen &&
      !existingTrade.feeOpenCost &&
      !trades.some((trade) => getTradeId(trade) === existingTrade.id)
    ) {
      `Removing cancelled trade: ${existingTrade.id}`;
      await tradesRef.doc(existingTrade.id).delete();
    }
  }
};

import * as camelcaseKeys from 'camelcase-keys';
import { firebase } from '.';
import { Profit } from '../api/models';
import { getDate } from '../utils/getDate';

export const saveProfit = async (
  profit: Profit,
  activeBotId: string,
): Promise<void> => {
  const date = getDate();
  const profitRef = firebase
    .firestore()
    .collection('bots')
    .doc(activeBotId)
    .collection('profit');
  const parsedData = camelcaseKeys(profit);
  const data = {
    ...parsedData,
    dateAdded: date,
  };
  await profitRef.doc('latest').set(data);
  await profitRef.doc(date).set(data);
};

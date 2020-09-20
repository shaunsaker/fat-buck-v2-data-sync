import * as camelcaseKeys from 'camelcase-keys';
import { firebase } from '.';
import { Profit } from '../api/models';
import { getDate } from '../utils/getDate';

export const saveProfit = async (
  profit: Profit,
  activeBotId: string,
): Promise<void> => {
  const date = getDate();
  const ref = firebase
    .firestore()
    .collection('bots')
    .doc(activeBotId)
    .collection('profit')
    .doc('latest');
  const parsedData = camelcaseKeys(profit);
  await ref.set({
    ...parsedData,
    dateAdded: date,
  });
};

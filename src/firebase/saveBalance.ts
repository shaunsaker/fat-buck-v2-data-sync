import * as camelcaseKeys from 'camelcase-keys';
import { firebase } from '.';
import { Balance } from '../api/models';
import { getDate } from '../utils/getDate';

export const saveBalance = async (
  balance: Balance,
  activeBotId: string,
): Promise<void> => {
  const date = getDate();
  const balanceRef = firebase
    .firestore()
    .collection('bots')
    .doc(activeBotId)
    .collection('balance');
  const parsedData = camelcaseKeys(balance);
  const data = {
    ...parsedData,
    dateAdded: date,
  };
  await balanceRef.doc('latest').set(data);
  await balanceRef.doc(date).set(data);
};

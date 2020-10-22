import * as camelcaseKeys from 'camelcase-keys';
import { firebase } from '.';
import { Balance } from '../bots/models';
import { getDate } from '../../utils/getDate';
import { PoolBalanceData } from './models';

export const saveBalance = async (
  balance: Balance,
  botId: string,
): Promise<void> => {
  const date = getDate();
  const ref = firebase
    .firestore()
    .collection('bots')
    .doc(botId)
    .collection('balance')
    .doc('latest');
  const parsedData = camelcaseKeys(balance);
  await ref.set({
    ...parsedData,
    dateAdded: date,
  });

  // save it to pool balance too
  const poolBalanceRef = firebase.firestore().collection('pool').doc('balance');
  const data: PoolBalanceData = {
    amount: balance.total,
    lastUpdated: date,
  };
  await poolBalanceRef.set(data);
};

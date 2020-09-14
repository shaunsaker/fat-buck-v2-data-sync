import * as camelcaseKeys from 'camelcase-keys';
import { firebase } from '.';
import { Balance } from '../api/models';
import { getDate } from '../utils/getDate';

export const saveBalance = async (balance: Balance): Promise<void> => {
  const date = getDate();
  const ref = firebase.firestore().collection('balance').doc('latest');
  const parsedData = camelcaseKeys(balance);
  await ref.set({
    ...parsedData,
    dateAdded: date,
  });
};

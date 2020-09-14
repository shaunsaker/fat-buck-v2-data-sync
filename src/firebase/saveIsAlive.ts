import { firebase } from '.';
import { getDate } from '../utils/getDate';

export const saveIsAlive = async (isAlive: boolean): Promise<void> => {
  const date = getDate();

  await firebase.firestore().collection('api').doc('health').set({
    isAlive,
    date,
  });
};

import { firebase } from '.';
import { getDate } from '../utils/getDate';

export const saveIsAlive = async (
  isAlive: boolean,
  activeBotId: string,
): Promise<void> => {
  const date = getDate();

  await firebase.firestore().collection('bots').doc(activeBotId).set({
    isAlive,
    dateUpdated: date,
  });
};

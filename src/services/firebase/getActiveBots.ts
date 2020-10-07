import { firebase } from '.';
import { Bot } from './models';

export const getActiveBots = async (): Promise<Bot[]> => {
  const activeBots = await (
    await firebase
      .firestore()
      .collection('bots')
      .where('isActive', '==', true)
      .get()
  ).docs.map((doc) => {
    return {
      ...(doc.data() as Bot),
      id: doc.id,
    };
  });

  return activeBots;
};

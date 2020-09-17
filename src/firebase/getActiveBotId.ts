import { firebase } from '.';

export const getActiveBotId = async (): Promise<string> => {
  const activeBotId = await (
    await firebase.firestore().collection('activeBot').get()
  ).docs[0].id;
  return activeBotId;
};

import Axios from 'axios';
import { api } from '.';

export const getAccessToken = async (): Promise<string> => {
  const {
    data: { access_token: accessToken },
  } = await Axios.post(
    api.login,
    {},
    {
      auth: {
        username: process.env.API_USERNAME,
        password: process.env.API_PASSWORD,
      },
    },
  );

  return accessToken;
};

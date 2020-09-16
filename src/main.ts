// Only use a local env file in dev
const isRunningOnHeroku = process.env.ON_HEROKU;
if (!isRunningOnHeroku) {
  require('dotenv').config();
}

import { getAccessToken } from './api/getAccessToken';
import { getBalance } from './api/getBalance';
import { getIsAlive } from './api/getIsAlive';
import { getProfit } from './api/getProfit';
import { getTrades } from './api/getTrades';
import { saveBalance } from './firebase/saveBalance';
import { saveIsAlive } from './firebase/saveIsAlive';
import { saveProfit } from './firebase/saveProfit';
import { saveTrades } from './firebase/saveTrades';

const main = async () => {
  console.log('Starting.');

  // test if the server is up
  let isAlive = false;
  try {
    isAlive = await getIsAlive();
  } catch (error) {
    console.log('Server error.', error);
  }

  await saveIsAlive(isAlive);

  if (!isAlive) {
    console.log('Not alive. Stopping.');
    process.exit();
  }

  const accessToken = await getAccessToken();

  console.log('Getting trades.');
  const trades = await getTrades(accessToken);
  console.log('Saving trades.');
  await saveTrades(trades);

  console.log('Getting profit.');
  const profit = await getProfit(accessToken);
  console.log('Saving profit.');
  await saveProfit(profit);

  console.log('Getting balance.');
  const balance = await getBalance(accessToken);
  console.log('Saving balance.');
  await saveBalance(balance);

  console.log('Done.');
  process.exit();
};

main();

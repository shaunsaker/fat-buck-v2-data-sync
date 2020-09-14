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
  const isAlive = await getIsAlive();
  await saveIsAlive(isAlive);

  if (!isAlive) {
    process.exit();
  }

  const accessToken = await getAccessToken();

  const trades = await getTrades(accessToken);
  await saveTrades(trades);

  const profit = await getProfit(accessToken);
  await saveProfit(profit);

  const balance = await getBalance(accessToken);
  await saveBalance(balance);

  process.exit();
};

main();

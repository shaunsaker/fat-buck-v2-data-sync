// Only use a local env file in dev
const isRunningOnHeroku = process.env.ON_HEROKU;
if (!isRunningOnHeroku) {
  require('dotenv').config();
}

import { getAccessToken } from './botApi/getAccessToken';
import { getBalance } from './botApi/getBalance';
import { getIsAlive } from './botApi/getIsAlive';
import { getProfit } from './botApi/getProfit';
import { getOpenTrades } from './botApi/getOpenTrades';
import { getTrades } from './botApi/getTrades';
import { saveBalance } from './firebase/saveBalance';
import { saveIsAlive } from './firebase/saveIsAlive';
import { saveProfit } from './firebase/saveProfit';
import { saveTrades } from './firebase/saveTrades';
import { getActiveBots } from './firebase/getActiveBots';
import { getExchangeRates } from './exchangeRatesApi/getExchangeRates';
import { saveExchangeRates } from './firebase/saveExchangeRates';

const main = async () => {
  console.log('Starting.');

  console.log('Getting active bots.');
  const activeBots = await getActiveBots();

  for (const bot of activeBots) {
    // test if the server is up
    let isAlive = false;
    try {
      isAlive = await getIsAlive(bot.api);
    } catch (error) {
      console.log('Server error.', error);
    }

    await saveIsAlive(bot.id, isAlive);

    if (!isAlive) {
      console.log('Not alive. Stopping.');
      process.exit();
    }

    const accessToken = await getAccessToken(bot.api);

    console.log('Getting trades.');
    const trades = await getTrades(bot.api, accessToken);
    console.log('Getting open trades.');
    const openTrades = await getOpenTrades(bot.api, accessToken); // aka open trades
    const allTrades = [...trades, ...openTrades];
    console.log('Saving trades.');
    await saveTrades(allTrades, bot.id);

    console.log('Getting profit.');
    const profit = await getProfit(bot.api, accessToken);
    console.log('Saving profit.');
    await saveProfit(profit, bot.id);

    console.log('Getting balance.');
    const balance = await getBalance(bot.api, accessToken);
    console.log('Saving balance.');
    await saveBalance(balance, bot.id);
  }

  console.log('Getting exchange rates.');
  const exchangeRates = await getExchangeRates();
  console.log('Saving exchange rates.');
  await saveExchangeRates(exchangeRates);

  console.log('Done.');
  process.exit();
};

main();

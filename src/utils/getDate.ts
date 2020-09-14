import * as moment from 'moment';

export const getDate = (): string => {
  const date = moment().toISOString();
  return date;
};

import { DropdownItemProps } from 'semantic-ui-react';

const MARKET_TYPE_DICT = [
  {
    id: 'mt_1',
    maxAmount: 50000000,
    maxTermInMonths: 190,
    minAmount: 600000,
    minTermInMonths: 50,
    name: 'Первичный',
  },
  {
    id: 'mt_2',
    maxAmount: 34000000,
    maxTermInMonths: 80,
    minAmount: 1400000,
    minTermInMonths: 14,
    name: 'Вторичный',
  },
];

export const NORMALIZED_MARKET_TYPE_DICT = MARKET_TYPE_DICT.reduce(
  (
    acc: Record<string, any>,
    cur: Record<string, any>,
  ) => ({ ...acc, [cur.id]: cur }),
  {},
);

export const MARKET_TYPE_SELECT_OPTIONS: DropdownItemProps[] = MARKET_TYPE_DICT.map(
  ({ id, name }) => ({
    key: id,
    text: name,
    value: id,
  }),
);

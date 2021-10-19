import { DropdownItemProps } from 'semantic-ui-react';

const ESTATE_REGON_DICT = [
  {
    id: 'er_1',
    maxAmount: 9000000,
    maxTermInMonths: 100,
    minAmount: 8000000,
    minTermInMonths: 33,
    name: 'Москва',
  },
  {
    id: 'er_2',
    maxAmount: 8000000,
    maxTermInMonths: 90,
    minAmount: 7000000,
    minTermInMonths: 14,
    name: 'Липецк',
  },
  {
    id: 'er_3',
    maxAmount: 10000000,
    maxTermInMonths: 110,
    minAmount: 9000000,
    minTermInMonths: 44,
    name: 'Нефтекамск',
  },
];

export const NORMALIZED_ESTATE_REGION_DICT = ESTATE_REGON_DICT.reduce(
  (
    acc: Record<string, any>,
    cur: Record<string, any>,
  ) => ({ ...acc, [cur.id]: cur }),
  {},
);

export const ESTATE_REGION_SELECT_OPTIONS: DropdownItemProps[] = ESTATE_REGON_DICT.map(
  ({ id, name }) => ({
    key: id,
    text: name,
    value: id,
  }),
);

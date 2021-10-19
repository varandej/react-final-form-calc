import { DropdownItemProps } from 'semantic-ui-react';

const ESTATE_TYPE_DICT = [
  {
    id: 'et_1',
    maxAmount: 17000000,
    maxTermInMonths: 240,
    minAmount: 4000000,
    minTermInMonths: 50,
    name: 'Квартира',
  },
  {
    id: 'er_1',
    maxAmount: 20000000,
    maxTermInMonths: 40,
    minAmount: 1300000,
    minTermInMonths: 20,
    name: 'Дом',
  },
];

export const NORMALIZED_ESTATE_TYPE_DICT = ESTATE_TYPE_DICT.reduce(
  (
    acc: Record<string, any>,
    cur: Record<string, any>,
  ) => ({ ...acc, [cur.id]: cur }),
  {},
);

export const ESTATE_TYPE_SELECT_OPTIONS: DropdownItemProps[] = ESTATE_TYPE_DICT.map(
  ({ id, name }) => ({
    key: id,
    text: name,
    value: id,
  }),
);

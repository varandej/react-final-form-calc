import { TProduct } from './offer-list-types';

export const AVAILABLE_PRODUCT_LIST: TProduct[] = [
  {
    baseRate: '5.7',
    id: 'p_1',
    insuranceRateMod: '0.5',
    maxAmount: '15000000',
    maxTermInMonths: '120',
    minAmount: '400000',
    minTermInMonths: '4',
    name: 'Молодежный кредит',
    salaryRateMod: '0.8',
  },
  {
    baseRate: '14.9',
    id: 'p_2',
    insuranceRateMod: '3.2',
    maxAmount: '60000000',
    maxTermInMonths: '240',
    minAmount: '1000000',
    minTermInMonths: '12',
    name: 'Модификаторный кредит',
    salaryRateMod: '4.1',
  },
  {
    baseRate: '1.5',
    id: 'p_3',
    insuranceRateMod: '0.2',
    maxAmount: '70000',
    maxTermInMonths: '3',
    minAmount: '500',
    minTermInMonths: '1',
    name: 'Пельменный кредит',
    salaryRateMod: '0.1',
  },
];

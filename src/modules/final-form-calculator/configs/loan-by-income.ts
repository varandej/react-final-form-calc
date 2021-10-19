import { Checkbox, Dropdown } from 'semantic-ui-react';
import { DAYS_IN_YEAR } from '../../../lib/common';
import {
  TFinalFormCalculatorFieldsConfigItem, TValidationConfig,
} from '../final-form-calculator-types';
import {
  EFinalFormAdditionalCalculatorFields as ANames,
  EFinalFormProductFields as PNames,
  EFinalFormCalculatorFields as FNames,
  EPayemntType,
} from '../final-form-calculator-enums';
import { PAYMENT_TYPE_DROPDOWN_OPTION_LIST } from '../final-form-calculator-constants';
import { FinalFormCalculatorReadonlyValuePresenter as ReadOnly } from '../components';
import { percentsFormatter, toIntFormatter } from '../final-form-calculator-utils';

/**
 * Конфиг отображаемых полей
 */
export const LOAN_BY_INCOME_FIELDS_CONFIG: TFinalFormCalculatorFieldsConfigItem[] = [
  {
    format: toIntFormatter,
    label: 'Среднемесячный доход',
    name: FNames.AverageIncome,
    width: 6,
  },
  {
    format: toIntFormatter,
    label: '% На погашение',
    name: FNames.RepaymentPercentage,
    width: 4,
  },
  {
    control: ReadOnly,
    format: percentsFormatter,
    label: 'Ставка',
    name: FNames.Rate,
    width: 6,
  },
  {
    control: Dropdown,
    fluid: true,
    label: 'Тип платежа',
    name: FNames.PaymentType,
    options: PAYMENT_TYPE_DROPDOWN_OPTION_LIST,
    selection: true,
    width: 6,
  },
  {
    format: toIntFormatter,
    label: 'Срок кредита (мес.)',
    name: FNames.TermInMonths,
    width: 4,
  },
  {
    control: ReadOnly,
    format: toIntFormatter,
    label: 'Ежемесячный платеж',
    name: FNames.MonthlyPayment,
    width: 6,
  },
  {
    control: Checkbox,
    label: 'Страховка от банка',
    name: FNames.IsInsuredInBank,
    slider: true,
    width: 6,
  },
  {
    control: Checkbox,
    label: 'ЗП клиент',
    name: FNames.IsSalary,
    slider: true,
    width: 4,
  },
  {
    control: ReadOnly,
    format: toIntFormatter,
    label: 'Переплата',
    name: FNames.Overpayment,
    width: 6,
  },
  {
    control: ReadOnly,
    fluid: true,
    label: 'Продукт',
    name: FNames.Product,
    options: PAYMENT_TYPE_DROPDOWN_OPTION_LIST,
    propName: 'name',
    selection: true,
    width: 6,
  },
  {
    control: ReadOnly,
    format: toIntFormatter,
    label: 'Сумма кредита',
    name: FNames.Amount,
    width: 4,
  },
  {
    control: ReadOnly,
    format: toIntFormatter,
    label: 'Всего выплат',
    name: FNames.TotalAmount,
    width: 6,
  },
];

/**
 * Конфиг валидации значений калькулятора
 */
export const LOAN_BY_INCOME_VALIDATION_CONFIG: TValidationConfig = {
  [FNames.TermInMonths]: [
    {
      error: 'Некорректныя срок кредита',
      expression: `${FNames.TermInMonths} > 266 or ${FNames.TermInMonths} < 2`,
    },
  ],
};

/**
 * Конфиг начальных значений калькулятора
 */
export const LOAN_BY_INCOME_INITIAL_VALUES = {
  // расчеты основных полей
  [FNames.AverageIncome]: 'N(150000)',
  [FNames.TermInMonths]: 'N(60)',
  [FNames.RepaymentPercentage]: `N(10)`,
  [FNames.PaymentType]: `"${EPayemntType.Differentiated}"`,
  [FNames.IsSalary]: false,
  [FNames.IsInsuredInBank]: false,
  [FNames.Rate]: `${PNames.BaseRate}`,

  // доп. рассчеты
  [ANames.YearlyRateCoefficient]: `${FNames.Rate} / 100`,
  [ANames.MonthlyRateCoefficient]: `${ANames.YearlyRateCoefficient} / 12`,
  [ANames.RepaymentSum]: `${FNames.AverageIncome} * (${FNames.RepaymentPercentage} / 100)`,

  [FNames.Amount]: (
    `${ANames.RepaymentSum} * (${FNames.TermInMonths} / (1 + (${
      ANames.YearlyRateCoefficient} * ${FNames.TermInMonths} * 31) / ${DAYS_IN_YEAR}))`
  ),
};

import { Checkbox, Select } from 'semantic-ui-react';
import {
  TFinalFormCalculatorFieldsConfigItem, TInitialValuesConfig, TValidationConfig,
} from '../final-form-calculator-types';
import { EFinalFormCalculatorFields as FNames, EPayemntType } from '../final-form-calculator-enums';
import {
  PAYMENT_TYPE_DROPDOWN_OPTION_LIST, PRODUCT_DROPDOWN_OPTION_LIST,
} from '../final-form-calculator-constants';
import { FinalFormCalculatorReadonlyValuePresenter as ReadOnly } from '../components';
import { percentsFormatter, toIntFormatter } from '../final-form-calculator-utils';

/**
 * Конфиг отображаемых полей
 */
export const LOAN_BY_SUM_FIELDS_CONFIG: TFinalFormCalculatorFieldsConfigItem[] = [
  {
    format: toIntFormatter,
    label: 'Cумма кредита',
    name: FNames.Amount,
    width: 5,
  },
  {
    format: toIntFormatter,
    label: 'Срок кредита (мес.)',
    name: FNames.TermInMonths,
    width: 5,
  },
  {
    control: ReadOnly,
    format: percentsFormatter,
    label: 'Ставка',
    name: FNames.Rate,
    width: 6,
  },
  {
    control: Select,
    fluid: true,
    label: 'Тип платежа',
    name: FNames.PaymentType,
    options: PAYMENT_TYPE_DROPDOWN_OPTION_LIST,
    selection: true,
    width: 10,
  },
  {
    control: ReadOnly,
    format: toIntFormatter,
    label: 'Ежемесячный платеж',
    name: FNames.MonthlyPayment,
    width: 6,
  },
  {
    control: Select,
    fluid: true,
    label: 'Продукт',
    name: FNames.Product,
    options: PRODUCT_DROPDOWN_OPTION_LIST,
    selection: true,
    width: 10,
  },
  {
    control: ReadOnly,
    format: toIntFormatter,
    label: 'Переплата',
    name: FNames.Overpayment,
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
    label: 'Всего выплат',
    name: FNames.TotalAmount,
    width: 6,
  },
];

/**
 * Конфиг валидации значений калькулятора
 */
export const LOAN_BY_SUM_VALIDATION_CONFIG: TValidationConfig = {
  [FNames.Amount]: [
    {
      error: 'Некорректная сумма кредита',
      expression: `${FNames.Amount} > 60000000 or ${FNames.Amount} < 100000`,
    },
  ],
  [FNames.TermInMonths]: [
    {
      error: 'Некорректная срок кредита',
      expression: `${FNames.TermInMonths} > 266 or ${FNames.TermInMonths} < 2`,
    },
  ],
};

/**
 * Конфиг начальных значений калькулятора
 */
export const LOAN_BY_SUM_INITIAL_VALUES: TInitialValuesConfig = {
  [FNames.Amount]: 'N(2000000)',
  [FNames.TermInMonths]: '12',
  [FNames.PaymentType]: `"${EPayemntType.Annuity}"`,
  [FNames.IsSalary]: false,
  [FNames.IsInsuredInBank]: false,
};

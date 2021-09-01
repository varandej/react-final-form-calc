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
    hidden: false,
    label: 'Cумма кредита',
    name: FNames.Amount,
    required: true,
    width: 5,
  },
  {
    format: toIntFormatter,
    hidden: false,
    label: 'Срок кредита',
    name: FNames.TermInMonths,
    required: true,
    width: 5,
  },
  {
    control: ReadOnly,
    format: percentsFormatter,
    hidden: false,
    label: 'Ставка',
    name: FNames.Rate,
    required: false,
    width: 6,
  },
  {
    control: Select,
    fluid: true,
    hidden: false,
    label: 'Тип платежа',
    name: FNames.PaymentType,
    options: PAYMENT_TYPE_DROPDOWN_OPTION_LIST,
    required: true,
    selection: true,
    width: 10,
  },
  {
    control: ReadOnly,
    format: toIntFormatter,
    hidden: false,
    label: 'Ежемесячный платеж',
    name: FNames.MonthlyPayment,
    required: false,
    width: 6,
  },
  {
    control: Select,
    fluid: true,
    hidden: false,
    label: 'Продукт',
    name: FNames.Product,
    options: PRODUCT_DROPDOWN_OPTION_LIST,
    required: true,
    selection: true,
    width: 10,
  },
  {
    control: ReadOnly,
    format: toIntFormatter,
    hidden: false,
    label: 'Переплата',
    name: FNames.Overpayment,
    required: false,
    width: 6,
  },
  {
    control: Checkbox,
    hidden: false,
    label: 'ЗП клиент',
    name: FNames.IsSalary,
    required: false,
    slider: true,
    width: 4,
  },
  {
    control: Checkbox,
    hidden: false,
    label: 'Страховка от банка',
    name: FNames.IsInsuredInBank,
    required: false,
    slider: true,
    width: 6,
  },
  {
    control: ReadOnly,
    format: toIntFormatter,
    hidden: false,
    label: 'Всего выплат',
    name: FNames.TotalAmount,
    required: false,
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
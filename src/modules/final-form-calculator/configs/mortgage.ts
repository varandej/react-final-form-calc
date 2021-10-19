import { Checkbox, Dropdown } from 'semantic-ui-react';
import {
  ESTATE_REGION_SELECT_OPTIONS, ESTATE_TYPE_SELECT_OPTIONS, MARKET_TYPE_SELECT_OPTIONS,
} from '../../../lib/dicts';
import {
  TFinalFormCalculatorFieldsConfigItem, TValidationConfig,
} from '../final-form-calculator-types';
import {
  EFinalFormAdditionalCalculatorFields as ANames,
  EFinalFormCalculatorFields as FNames,
  EFinalFormProductFields as PNames,
  EPayemntType,
} from '../final-form-calculator-enums';
import { PAYMENT_TYPE_DROPDOWN_OPTION_LIST } from '../final-form-calculator-constants';
import { FinalFormCalculatorReadonlyValuePresenter as ReadOnly } from '../components';
import { percentsFormatter, toIntFormatter } from '../final-form-calculator-utils';

/**
 * Конфиг отображаемых полей
 */
export const MORTGAGE_FIELDS_CONFIG: TFinalFormCalculatorFieldsConfigItem[] = [
  {
    control: Dropdown,
    fluid: true,
    label: 'Рынок',
    name: FNames.MarketTypeId,
    options: MARKET_TYPE_SELECT_OPTIONS,
    selection: true,
    width: 4,
  },
  {
    control: Dropdown,
    fluid: true,
    label: 'Тип ОН',
    name: FNames.EstateTypeId,
    options: ESTATE_TYPE_SELECT_OPTIONS,
    selection: true,
    width: 4,
  },
  {
    control: Dropdown,
    fluid: true,
    label: 'Регион ОН',
    name: FNames.EstateRegionId,
    options: ESTATE_REGION_SELECT_OPTIONS,
    selection: true,
    width: 8,
  },
  {
    control: Checkbox,
    label: 'Ипотека для семей с детьми',
    name: FNames.IsWithChildren,
    slider: true,
    width: 8,
  },
  {
    control: Checkbox,
    label: 'ЗП клиент',
    name: FNames.IsSalary,
    slider: true,
    width: 8,
  },
  {
    control: Checkbox,
    label: 'Ипотека с гос. поддержкой',
    name: FNames.IsWithSupport,
    slider: true,
    width: 8,
  },
  {
    control: Checkbox,
    label: 'Страховка от банка',
    name: FNames.IsInsuredInBank,
    slider: true,
    width: 8,
  },
  {
    placeholder: true,
    width: 16,
  },
  {
    format: toIntFormatter,
    label: 'Сумма кредита',
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
    format: toIntFormatter,
    label: 'Первоначальный взнос',
    name: FNames.InitialFee,
    width: 5,
  },
  {
    format: toIntFormatter,
    label: 'Стоимость ОН',
    name: FNames.EstateCost,
    width: 5,
  },
  {
    control: ReadOnly,
    format: toIntFormatter,
    label: 'Ежемесячный платеж',
    name: FNames.MonthlyPayment,
    width: 6,
  },
  {
    control: Dropdown,
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
    label: 'Переплата',
    name: FNames.Overpayment,
    width: 6,
  },
  {
    placeholder: true,
    width: 10,
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
export const MORGAGE_VALIDATION_CONFIG: TValidationConfig = {
  [FNames.Amount]: [
    {
      error: `Минимальная сумма ${ANames.MinAmount}`,
      expression: `${FNames.Amount} < ${ANames.MinAmount}`,
    },
    {
      error: `Максимальная сумма ${ANames.MaxAmount}`,
      expression: `${FNames.Amount} > ${ANames.MaxAmount}`,
    },
  ],
  [FNames.TermInMonths]: [
    {
      error: `Минимальный срок ${ANames.MinTermInMonths}`,
      expression: `${FNames.TermInMonths} < ${ANames.MinTermInMonths}`,
    },
    {
      error: `Максимальный срок ${ANames.MaxTermInMonths}`,
      expression: `${FNames.TermInMonths} > ${ANames.MaxTermInMonths}`,
    },
  ],
};

/**
 * Конфиг начальных значений калькулятора
 */
export const MORTGAGE_INITIAL_VALUES = {
  [FNames.Amount]: 'N(4000000)',
  [FNames.TermInMonths]: 'N(121)',
  [FNames.InitialFee]: `N(2000000)`,
  [FNames.EstateCost]: `N(6000000)`,
  [FNames.PaymentType]: `"${EPayemntType.Differentiated}"`,
  [FNames.IsSalary]: false,
  [FNames.IsInsuredInBank]: false,
  [FNames.IsWithChildren]: false,
  [FNames.IsWithSupport]: false,
  [FNames.Rate]: `${PNames.BaseRate}`,
  [FNames.EstateRegionId]: `"${ESTATE_REGION_SELECT_OPTIONS[0].value}"`,
  [FNames.EstateTypeId]: `"${ESTATE_TYPE_SELECT_OPTIONS[0].value}"`,
  [FNames.MarketTypeId]: `"${MARKET_TYPE_SELECT_OPTIONS[0].value}"`,

  // доп. рассчеты
  [ANames.YearlyRateCoefficient]: `${FNames.Rate} / 100`,
  [ANames.MonthlyRateCoefficient]: `${ANames.YearlyRateCoefficient} / 12`,
};

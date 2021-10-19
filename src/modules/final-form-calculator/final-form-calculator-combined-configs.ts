import {
  LOAN_BY_INCOME_FIELDS_CONFIG,
  LOAN_BY_INCOME_INITIAL_VALUES,
  LOAN_BY_INCOME_VALIDATION_CONFIG,
  LOAN_BY_SUM_FIELDS_CONFIG,
  LOAN_BY_SUM_INITIAL_VALUES,
  LOAN_BY_SUM_VALIDATION_CONFIG,
  MORGAGE_VALIDATION_CONFIG,
  MORTGAGE_FIELDS_CONFIG,
  MORTGAGE_INITIAL_VALUES,
  PRIMITIVE_FIELDS_CONFIG,
  PRIMITIVE_INITIAL_VALUES,
  PRIMITIVE_VALIDATION_CONFIG,
} from './configs';
import {
  LOAN_BY_INCOME_DECORATOR,
  LOAN_BY_SUM_DECORATOR,
  MORTGAGE_DECORATOR,
  PRIMITIVE_DECORATOR,
} from './decorators';
import { TFinalFormCalculatorConfigItem } from './final-form-calculator-types';
import { ECalcTypes } from './final-form-calculator-enums';

const PRIMITIVE: TFinalFormCalculatorConfigItem = {
  fieldsConfig: PRIMITIVE_FIELDS_CONFIG,
  decorators: [PRIMITIVE_DECORATOR],
  initialValuesConfig: PRIMITIVE_INITIAL_VALUES,
  validationConfig: PRIMITIVE_VALIDATION_CONFIG,
};
const LOAN_BY_SUM: TFinalFormCalculatorConfigItem = {
  fieldsConfig: LOAN_BY_SUM_FIELDS_CONFIG,
  decorators: [LOAN_BY_SUM_DECORATOR],
  initialValuesConfig: LOAN_BY_SUM_INITIAL_VALUES,
  validationConfig: LOAN_BY_SUM_VALIDATION_CONFIG,
};
const LOAN_BY_INCOME: TFinalFormCalculatorConfigItem = {
  fieldsConfig: LOAN_BY_INCOME_FIELDS_CONFIG,
  decorators: [LOAN_BY_INCOME_DECORATOR],
  initialValuesConfig: LOAN_BY_INCOME_INITIAL_VALUES,
  validationConfig: LOAN_BY_INCOME_VALIDATION_CONFIG,
};
const MORTGAGE: TFinalFormCalculatorConfigItem = {
  fieldsConfig: MORTGAGE_FIELDS_CONFIG,
  decorators: [MORTGAGE_DECORATOR],
  initialValuesConfig: MORTGAGE_INITIAL_VALUES,
  validationConfig: MORGAGE_VALIDATION_CONFIG,
};

/**
 * Мапа всех написанных калькуляторов
 */
export const FF_CALC_CONFIGS: Record<ECalcTypes, TFinalFormCalculatorConfigItem> = {
  [ECalcTypes.LoanByIncome]: LOAN_BY_INCOME,
  [ECalcTypes.LoanBySum]: LOAN_BY_SUM,
  [ECalcTypes.Primitive]: PRIMITIVE,
  [ECalcTypes.Mortgage]: MORTGAGE,
};
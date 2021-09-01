import createDecorator from 'final-form-calculate';
import { Decorator } from 'final-form';
import { createUpdates } from '../final-form-calculator-utils';
import {
  EFinalFormAdditionalCalculatorFields as ANames,
  EFinalFormProductFields as PNames,
  EFinalFormCalculatorFields as FNames,
} from '../final-form-calculator-enums';

/**
 * Декоратор простейшего калькулятора
 */
export const LOAN_BY_INCOME_DECORATOR: Decorator = createDecorator(
  {
    field: [
      FNames.IsInsuredInBank,
      FNames.IsSalary,
      FNames.Product,
    ],
    updates: createUpdates({
      // доп. рассчеты
      [ANames.SalaryRateMod]: `${FNames.IsSalary} ? ${PNames.SalaryRateMod} : 0`,
      [ANames.InsuranceRateMod]: `${FNames.IsInsuredInBank} ? ${PNames.InsuranceRateMod} : 0`,

      // рассчеты целевых полей
      [FNames.Rate]: (
        `${PNames.BaseRate} - ${ANames.InsuranceRateMod} - ${ANames.SalaryRateMod}`
      ),

      // доп. рассчеты
      [ANames.MonthlyRateCoefficient]: `${FNames.Rate} / 12 / 100`,
    }),
  },
  {
    field: [
      FNames.Amount,
      FNames.PaymentType,
      FNames.Rate,
      FNames.TermInMonths,
    ],
    updates: createUpdates({
    }),
  },
);

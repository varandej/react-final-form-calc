import createDecorator from 'final-form-calculate';
import { Decorator } from 'final-form';
import { createUpdates } from '../final-form-calculator-utils';
import {
  EFinalFormProductFields as PNames,
  EFinalFormAdditionalCalculatorFields as ANames,
  EFinalFormCalculatorFields as FNames,
  EPayemntType,
} from '../final-form-calculator-enums';

/**
 * Декоратор простейшего калькулятора
 */
export const LOAN_BY_SUM_DECORATOR: Decorator = createDecorator(
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
      // доп. рассчеты
      [ANames.AnnuityMonthlyPayment]: (
        `${FNames.Amount} * (1 + ${ANames.MonthlyRateCoefficient} * (${
          FNames.TermInMonths} - 1)) / (${FNames.TermInMonths} - 1)`
      ),
      [ANames.DifferentiatedMonthlyPayment]: (
        `(${FNames.Amount} / ${FNames.TermInMonths}) + (${FNames.Amount} * ${
          ANames.MonthlyRateCoefficient})`
      ),
      [ANames.AnnuityOverpayment]: (
        `${ANames.AnnuityMonthlyPayment} * (${FNames.TermInMonths} - 1) + ${
          FNames.Amount} * ${ANames.MonthlyRateCoefficient} - ${FNames.Amount}`
      ),
      [ANames.DiffernetioatedOverpayment]: (
        `(${FNames.Amount} * ${ANames.MonthlyRateCoefficient} * (${
          FNames.TermInMonths} + 2)) / 2`
      ),

      // рассчеты целевых полей
      [FNames.MonthlyPayment]: (
        `isEq(${FNames.PaymentType}, "${EPayemntType.Annuity}") ? ${
          ANames.AnnuityMonthlyPayment} : ${ANames.DifferentiatedMonthlyPayment}`
      ),
      [FNames.Overpayment]: (
        `isEq(${FNames.PaymentType}, "${EPayemntType.Annuity}") ? ${
          ANames.AnnuityOverpayment} : ${ANames.DiffernetioatedOverpayment}`
      ),
      [FNames.TotalAmount]: `${FNames.Amount} + ${FNames.Overpayment}`,
    }),
  },
);

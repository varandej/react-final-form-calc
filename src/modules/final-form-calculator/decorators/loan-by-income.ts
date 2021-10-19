import createDecorator from 'final-form-calculate';
import { Decorator } from 'final-form';
import { DAYS_IN_YEAR, FULL_IN_PERCENTS } from '../../../lib/common';
import { createUpdates } from '../final-form-calculator-utils';
import {
  EFinalFormAdditionalCalculatorFields as ANames,
  EFinalFormCalculatorFields as FNames,
  EFinalFormProductFields as PNames,
  EPayemntType,
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
      [ANames.YearlyRateCoefficient]: `${FNames.Rate} / 100`,
      [ANames.MonthlyRateCoefficient]: `${ANames.YearlyRateCoefficient} / 12`,
    }),
  },
  {
    field: FNames.RepaymentPercentage,
    updates: createUpdates({
      [FNames.RepaymentPercentage]: `${FULL_IN_PERCENTS} < ${FNames.RepaymentPercentage} ? ${
        FULL_IN_PERCENTS} : ${FNames.RepaymentPercentage}`
    }),
  },
  {
    field: [
      FNames.AverageIncome,
      FNames.PaymentType,
      FNames.Rate,
      FNames.RepaymentPercentage,
    ],
    updates: createUpdates({
      // доп. рассчеты
      [ANames.RepaymentSum]: `${FNames.AverageIncome} * (${FNames.RepaymentPercentage} / 100)`,
      [ANames.AnnuityAmount]: (
        `${ANames.RepaymentSum} * ((1 - (1 + ${ANames.MonthlyRateCoefficient}) ^ (-(${
          FNames.TermInMonths} - 1))) / ${ANames.MonthlyRateCoefficient})`
      ),
      [ANames.DifferentiatedAmount]: (
        `${ANames.RepaymentSum} * (${FNames.TermInMonths} / (1 + (${
          ANames.YearlyRateCoefficient} * ${FNames.TermInMonths} * 31) / ${DAYS_IN_YEAR}))`
      ),

      // рассчеты целевых полей
      [FNames.Amount]: (
        `isEq(${FNames.PaymentType}, "${EPayemntType.Annuity}") ? ${ANames.AnnuityAmount} : ${
          ANames.DifferentiatedAmount}`
      ),
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

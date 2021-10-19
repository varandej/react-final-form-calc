import createDecorator from 'final-form-calculate';
import { Decorator } from 'final-form';
import {
  NORMALIZED_ESTATE_REGION_DICT, NORMALIZED_ESTATE_TYPE_DICT, NORMALIZED_MARKET_TYPE_DICT,
} from '../../../lib/dicts';
import { CHILDREN_RATE_MOD, SUPPORT_RATE_MOD } from '../../../lib/common';
import { createUpdates } from '../final-form-calculator-utils';
import {
  EFinalFormExternalScopeFields as ENames,
  EFinalFormAdditionalCalculatorFields as ANames,
  EFinalFormCalculatorFields as FNames,
  EFinalFormProductFields as PNames,
  EPayemntType,
} from '../final-form-calculator-enums';

/**
 * Декоратор простейшего калькулятора
 */
export const MORTGAGE_DECORATOR: Decorator = createDecorator(
  {
    field: FNames.IsWithChildren,
    updates: createUpdates({
      [FNames.IsWithSupport]: `${FNames.IsWithChildren} ? false : ${FNames.IsWithSupport}`,
    }),
  },
  {
    field: FNames.IsWithSupport,
    updates: createUpdates({
      [FNames.IsWithChildren]: `${FNames.IsWithSupport} ? false : ${FNames.IsWithChildren}`,
    }),
  },
  {
    field: [
      FNames.EstateRegionId,
      FNames.EstateTypeId,
      FNames.MarketTypeId,
    ],
    updates: createUpdates(
      {
        [ANames.MaxAmount]: (
          `min(${PNames.MaxAmount}, get(${ENames.EstateRegionDict}, ${
            FNames.EstateRegionId}, "maxAmount"), get(${ENames.EstateTypeDict}, ${
            FNames.EstateTypeId}, "maxAmount"), get(${ENames.MarketTypeDict}, ${
            FNames.MarketTypeId}, "maxAmount"))`
        ),
        [ANames.MinAmount]: (
          `max(${PNames.MinAmount}, get(${ENames.EstateRegionDict}, ${
            FNames.EstateRegionId}, "minAmount"), get(${ENames.EstateTypeDict}, ${
            FNames.EstateTypeId}, "minAmount"), get(${ENames.MarketTypeDict}, ${
            FNames.MarketTypeId}, "minAmount"))`
        ),
        [ANames.MaxTermInMonths]: (
          `min(${PNames.MaxTermInMonths}, get(${ENames.EstateRegionDict}, ${
            FNames.EstateRegionId}, "maxTermInMonths"), get(${ENames.EstateTypeDict}, ${
            FNames.EstateTypeId}, "maxTermInMonths"), get(${ENames.MarketTypeDict}, ${
            FNames.MarketTypeId}, "maxTermInMonths"))`
        ),
        [ANames.MinTermInMonths]: (
          `max(${PNames.MinTermInMonths}, get(${ENames.EstateRegionDict}, ${
            FNames.EstateRegionId}, "minTermInMonths"), get(${ENames.EstateTypeDict}, ${
            FNames.EstateTypeId}, "minTermInMonths"), get(${ENames.MarketTypeDict}, ${
            FNames.MarketTypeId}, "minTermInMonths"))`
        ),
      },
      {
        [ENames.EstateRegionDict]: NORMALIZED_ESTATE_REGION_DICT,
        [ENames.EstateTypeDict]: NORMALIZED_ESTATE_TYPE_DICT,
        [ENames.MarketTypeDict]: NORMALIZED_MARKET_TYPE_DICT,
      },
    ),
  },
  {
    field: [
      FNames.IsInsuredInBank,
      FNames.IsSalary,
      FNames.IsWithChildren,
      FNames.IsWithSupport,
    ],
    updates: createUpdates({
      // доп. рассчеты
      [ANames.SalaryRateMod]: `${FNames.IsSalary} ? ${PNames.SalaryRateMod} : 0`,
      [ANames.InsuranceRateMod]: `${FNames.IsInsuredInBank} ? ${PNames.InsuranceRateMod} : 0`,
      [ANames.ChildrenRateMod]: `${FNames.IsWithChildren} ? ${CHILDREN_RATE_MOD} : 0`,
      [ANames.SupportRateMod]: `${FNames.IsWithSupport} ? ${SUPPORT_RATE_MOD} : 0`,

      // рассчеты целевых полей
      [FNames.Rate]: (
        `${PNames.BaseRate} - ${ANames.InsuranceRateMod} - ${ANames.SalaryRateMod} - ${
          ANames.ChildrenRateMod} - ${ANames.SupportRateMod}`
      ),

      // доп. рассчеты
      [ANames.YearlyRateCoefficient]: `${FNames.Rate} / 100`,
      [ANames.MonthlyRateCoefficient]: `${ANames.YearlyRateCoefficient} / 12`,
    }),
  },
  {
    field: [
      FNames.EstateCost,
      FNames.InitialFee,
    ],
    updates: createUpdates({
      [FNames.Amount]: `max(${FNames.EstateCost} - ${FNames.InitialFee}, 0)`,
    }),
  },
  {
    field: FNames.Amount,
    updates: createUpdates({
      [FNames.InitialFee]: `max(${FNames.EstateCost} - ${FNames.Amount}, 0)`,
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

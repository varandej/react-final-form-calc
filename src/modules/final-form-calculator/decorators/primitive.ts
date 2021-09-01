import createDecorator from 'final-form-calculate';
import { Decorator } from 'final-form';
import { createUpdates } from '../final-form-calculator-utils';
import {
  EFinalFormCalculatorFields as FNames, EPayemntType,
} from '../final-form-calculator-enums';

/**
 * Декоратор простейшего калькулятора
 */
export const PRIMITIVE_DECORATOR: Decorator = createDecorator(
  {
    field: [
      FNames.Amount,
      FNames.PaymentType,
      FNames.TermInMonths,
    ],
    updates: createUpdates({
      [FNames.MonthlyPayment]: (
        `isEq(${FNames.PaymentType}, "${EPayemntType.Annuity}") ? (${
          FNames.Amount} * (1 + (${FNames.Rate} / 12 / 100) * (${
          FNames.TermInMonths} - 1)) / (${FNames.TermInMonths} - 1)) : ((${
          FNames.Amount} / ${FNames.TermInMonths}) + (${
          FNames.Amount} * (${FNames.Rate} / 12 / 100)))`
      ),
    }),
  }
);

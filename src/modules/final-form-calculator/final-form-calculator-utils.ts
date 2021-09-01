import { pipe } from 'fp-ts/lib/function';
import {
  curryN, join, invert, isNumber, map, round, split,
} from 'lodash/fp';
import { evalMathExpression } from '../../lib/math-js';
import {
  TFinalFormCalculatorValues, TInitialValuesConfig, TValidateConfigItem,
} from './final-form-calculator-types';
import {
  EFinalFormAdditionalCalculatorFields, EFinalFormCalculatorFields,
} from './final-form-calculator-enums';

const INITIAL_VALUES_TRIGGER_NAME = 'initialValues';
const VALIDATION_TRIGGER_NAME = 'validation';
const INVERTED_FIELDS_ENUM = invert({
  ...EFinalFormAdditionalCalculatorFields,
  ...EFinalFormCalculatorFields,
});

/**
 * Форматтер числовых полей
 * @param {string} value
 * @returns {string}
 */
export const toIntFormatter = (value: string = '0'): string => pipe(
  value,
  Number,
  round,
  String,
);

/**
 * Форматтер процентных полей
 * @param {string} value
 * @returns {string}
 */
export const percentsFormatter = (value: string = '0'): string => `${Number(value).toFixed(1)}%`;

/**
 * Ф-я создающая обработчик изменения поля ФФ калькулятора
 * @param {Record<string, string>} config 
 * @returns {TFinalFormCalculatorValues}
 */
export const createUpdates = (config: Record<string, string>) => (
  value: any,
  changedFieldName: string,
  allValues: TFinalFormCalculatorValues | undefined = {},
): TFinalFormCalculatorValues => (
  Object
    .keys(config)
    .reduce(
      (
        acc: TFinalFormCalculatorValues,
        cur: string,
      ) => ({
        ...acc,
        [cur]: evalMathExpression(
          config[cur],
          {
            ...allValues,
            ...acc,
          },
          {
            fieldName: cur,
            trigger: changedFieldName,
          },
        ),
      }),
      {},
    )
);

/**
 * Ф-я создающая начальные значения калькулятора из конфига и переданных внешних данных
 * @param {TInitialValuesConfig} config 
 * @param {Record<string, any>} externalValues 
 * @returns {TFinalFormCalculatorValues}
 */
export const createIntialValuesFromConfig = (
  config: TInitialValuesConfig,
  externalValues: Partial<TFinalFormCalculatorValues> | undefined = {},
): TFinalFormCalculatorValues => (
  Object
    .keys(config)
    .reduce(
      (
        acc: Partial<TFinalFormCalculatorValues>,
        cur: string,
      ) => ({
        ...acc,
        [cur]: evalMathExpression(
          config[cur],
          acc,
          {
            fieldName: cur,
            trigger: INITIAL_VALUES_TRIGGER_NAME,
          }
        ),
      }),
      { ...externalValues },
    )
);

/**
 * Собирает текст ошибки валидации со значениями из формы
 * @param {string} initErrorText - изначальный текст ошибки
 * @param {TFinalFormCalculatorValues} values - значения формы
 * @returns {string}
 */
const createErrorText = (
  initErrorText: string,
  values: TFinalFormCalculatorValues,
) => pipe(
  initErrorText,
  split(' '),
  map(
    (word: string) => (
      (!!INVERTED_FIELDS_ENUM[word] && isNumber(values[word]))
        ? round(values[word])
        : word
    ),
  ),
  join(' '),
);

/**
 * Возвращает функцию рекорд-лвл валидации для формы калькулятора
 */
export const createFinalFormRecordLvlValidator = curryN(
  2,
  (
    // TValidationConfig - reduce не хочет видеть enum в качестве значения
    config: Record<string, TValidateConfigItem[]>,
    values: TFinalFormCalculatorValues,
  ) => (
    Object
      .keys(config)
      .reduce(
        (
          acc: Record<string, string>,
          cur: string,
        ) => {
          // прогоняем значения формы по конфигам, ищем упавшее выражение
          const failedItem = config[cur]?.find(
            ({ expression }: TValidateConfigItem) => (
              evalMathExpression(
                expression,
                values,
                {
                  fieldName: cur,
                  trigger: VALIDATION_TRIGGER_NAME,
                },
              )
            ),
          );

          return (
            !!failedItem
              ? {
                ...acc,
                [cur]: createErrorText(failedItem.error, values),
              }
              : acc
          );
        },
        {},
      )
  ),
);

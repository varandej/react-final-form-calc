import * as math from 'mathjs';
import { curryN } from 'lodash/fp';
import { CurriedFunction3 } from 'lodash';
import { EVAL_FORMAT, FUNC_TO_REASSIGN_MAP } from '../math-ts-constants';
import { TEvalArg, TFuncToReassignMapItem } from '../math-ts-types';

/**
 * Приводит число к большому для точных расчетов
 * @param {TEvalArg} [value]
 * @return {number | math.BigNumber}
 */
const toBigNumber = (value: TEvalArg): number | math.BigNumber => (
  (value === undefined || value === '')
    ? 0
    : math.bignumber(
      String(value).replace(/\s/g, '').replace(',', '.'),
    )
      .toNumber()
);

/**
 * Фабрика переопределенных ф-ий
 * @param {TFuncToReassignMapItem}
 * @return {Function}
 */
const createReassignedFunc = curryN(
  2,
  (
    { func, withFormat }: TFuncToReassignMapItem,
    ...args: TEvalArg[]
  ) => (
    withFormat
      ? (
        math.format(
          func(...args.map(toBigNumber)),
          EVAL_FORMAT,
        )
      )
      : func(...args)
  ),
);

/**
 * Объект с переопреденными ф-ями mathjs
 */
const mathExtentions = {
  N: createReassignedFunc({
    func: toBigNumber,
    withFormat: true,
  }),
  ...Object
    .keys(FUNC_TO_REASSIGN_MAP)
    .reduce(
      (
        acc: Record<string, Function>,
        cur: string,
      ) => ({
        ...acc,
        [cur]: createReassignedFunc(FUNC_TO_REASSIGN_MAP[cur]),
      }),
      {},
    ),
};

/**
 * Создает ф-ю eval
 * @return {CurriedFunction3<string, Record<string, any>, Record<string, any>, any | void>}
 */
const createEvalMathExpressionFunc = () => {
  // создаем отдельный инстанс чтобы не гадить во внешний скоуп
  // типизируем как any т.к. ts орёт из-за возвращаемого Partial<...>
  const specificMath: any = math.create(math.all);

  // переопределяем базовые ф-ии mathjs в созданном инстансе
  specificMath
    .import(mathExtentions, { override: true });

  return curryN(
    3,
    (
      expression: string,
      scope: Record<string, any>,
      logData: Record<string, any>,
    ) => {
      try {
        return (
          specificMath
            .parse(expression)
            .compile()
            .evaluate(scope)
        );
      // обязательно ловим ошибки, т.к. по не осторожности наплодить их проще простого
      } catch (e) {
        console.warn({
          e,
          expression,
          logData,
          scope,
        });
      }
    },
  );
};

/**
 * Ф-я выполнения выражения из строки
 */
export const evalMathExpression: CurriedFunction3<
  string,
  Record<string, any>,
  Record<string, any>,
  any | void
> = createEvalMathExpressionFunc();

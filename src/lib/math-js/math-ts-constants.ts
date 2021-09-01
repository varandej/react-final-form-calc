import * as math from 'mathjs';
import { ceil, isEqual } from 'lodash';
import { TFuncToReassignMapItem } from './math-ts-types';

/**
 * Объект конфига для форматтера mathjs
 */
 export const EVAL_FORMAT: math.FormatOptions = { notation: 'fixed', precision: 12 };

 /**
  * Массив строковых названий ф-й mathjs для переопределения
  */
 export const FUNC_TO_REASSIGN_MAP: Record<string, TFuncToReassignMapItem> = {
   add: { func: math.add, withFormat: true },
   divide: { func: math.divide, withFormat: true },
   isEq: { func: isEqual, withFormat: false },
   max: { func: math.max, withFormat: true },
   min: { func: math.min, withFormat: true },
   multiply: { func: math.multiply, withFormat: true },
   pow: { func: math.pow, withFormat: true },
   roundUp: { func: ceil, withFormat: true },
   smaller: { func: math.smaller, withFormat: false },
   subtract: { func: math.subtract, withFormat: true },
 };

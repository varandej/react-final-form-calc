import * as math from 'mathjs';
import { ceil, get, isEqual } from 'lodash';
import { TFuncToReassignMapItem } from './math-ts-types';

/**
 * Каррированный get
 * @param {Record<string, any>} obj
 * @param {any[]} args 
 * @returns 
 */
const curriedGet = (obj: Record<string, any>, ...args: any[]) => get(obj, args);

/**
 * Возвращает ф-ю передающую все входящие аргументы как единый массив
 * @param {Function} func
 * @returns {Function}
 */
const transferArgs = (func: Function): Function => (...args: any[]) => func(args);

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
   get: { func: curriedGet, withFormat: false },
   isEq: { func: isEqual, withFormat: false },
   max: { func: transferArgs(math.max), withFormat: true },
   min: { func: transferArgs(math.min), withFormat: true },
   multiply: { func: math.multiply, withFormat: true },
   pow: { func: math.pow, withFormat: true },
   roundUp: { func: ceil, withFormat: true },
   smaller: { func: math.smaller, withFormat: false },
   subtract: { func: math.subtract, withFormat: true },
 };

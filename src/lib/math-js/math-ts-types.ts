
/**
 * Тип аргумента eval
 */
export type TEvalArg = string | number | undefined;

/**
 * Тип элемента мапы ф-й к переопределнию
 * @prop {Function} func - сама ф-я
 * @prop {boolean} withFormat - флаг необходимости форматирования числового результата
 */
export type TFuncToReassignMapItem = { func: Function; withFormat: boolean };


/**
 * Тип данных банковского продукта (условный)
 * @prop {string} baseInsuranceRate - базовое значение ставки
 * @prop {string} id - идентификатор
 * @prop {string} insuranceRateMod - модификатор ставки за страховку в банке
 * @prop {string} maxAmount - максимальная сумма кредита
 * @prop {string} maxTermInMonths - максимальный срок кредита
 * @prop {string} minAmount - минмальная сумма кредита
 * @prop {string} minTermInMonths - минимальный срок кредита
 * @prop {string} name - наименование продукта
 * @prop {string} salaryRateMod - модификатор ставки за ЗП в банке
 */
 export type TProduct = {
  baseRate: string;
  id: string,
  insuranceRateMod: string;
  maxAmount: string;
  maxTermInMonths: string;
  minAmount: string;
  minTermInMonths: string;
  name: string;
  salaryRateMod: string;
};

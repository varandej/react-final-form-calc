import { string } from 'fp-ts';
import { ReactNode } from 'react';
import { DropdownItemProps } from 'semantic-ui-react';

/**
 * Тип ф-ии форматтера и парсера
 */
type TFormatter = (value: string) => any;

/**
 * Тип собственных пропсов компонента поля ФФ калькулятора
 * @prop {ReactNode} [control] - компонент для отрисовки
 * @prop {boolean} [fluid] - признак для заполнения полем всей ширины контейнера
 * @prop {TFormatter} [format] - форматтер значения поля
 * @prop {boolean} hidden - флаг отображения
 * @prop {string} label - лейбл поля
 * @prop {string} name - имя поля
 * @prop {DropdownItemProps[]} [options] - опшены для селекта
 * @prop {string} [propName] - проп для отображения,если поле объект 
 * @prop {boolean} required - флаг обязательности
 * @prop {boolean} [selection] - флаг отображения дропдауна в виде селекта
 * @prop {boolean} [slider] - флаг указывающий чекбоксу отрисовываться слайдером

 */
export type TFinalFormCalculatorFieldOwnProps = {
  control?: ReactNode;
  fluid?: boolean;
  format?: TFormatter;
  hidden: boolean;
  label: string;
  name: string;
  options?: DropdownItemProps[];
  propName?: string;
  required: boolean;
  selection?: boolean;
  slider?: boolean;
};
import { SemanticWIDTHS } from 'semantic-ui-react';
import { Decorator } from 'final-form';
import { TFinalFormCalculatorFieldOwnProps } from './components';

/**
 * Тип элемента конфига валидации калькулятора
 * @prop {string} error - текст выводимой ошибки
 * @prop {string} expression - выражение проверки
 */
export type TValidateConfigItem = {
  error: string;
  expression: string;
};

/**
 * Тип всего конфига валидации калькулятора
 */
export type TValidationConfig = Record<string, TValidateConfigItem[]>;

/**
 * Тип конфига начальных значений формы
 */
export type TInitialValuesConfig = Record<string, any>;

/**
 * Тип значений формы калькулятора. Никакой конкретики, чистая абстракция
 */
export type TFinalFormCalculatorValues = Record<string, any>;

/**
 * Тип элемента конфига полей калькулятора ФФ
 * @prop {SemanticWIDTHS} width - ширина элемента
 * @extends {TFinalFormCalculatorFieldOwnProps}
 */
export type TFinalFormCalculatorFieldsConfigItem = { width: SemanticWIDTHS }
  & TFinalFormCalculatorFieldOwnProps;

  /**
 * Тип объекта конфигурации калькулятора ФФ
 * @prop {Decorator[]} - массив декораторов
 * @prop {TFinalFormCalculatorFieldsConfigItem[]} fieldsConfig - конфиг отображаемых полей
 */
export type TFinalFormCalculatorConfigItem = {
  decorators: Decorator[];
  fieldsConfig: TFinalFormCalculatorFieldsConfigItem[];
  initialValuesConfig: TInitialValuesConfig;
  validationConfig: TValidationConfig;
};

/**
 * Тип собственных пропсов калькулятора ФФ
 * @prop {Partial<TFinalFormCalculatorValues>} [externalValues] - внешний данные для формы
 * @extends {TFinalFormCalculatorConfigItem}
 */
export type TFinalFormCalculatorOwnProps = { externalValues?: Partial<TFinalFormCalculatorValues> }
  & TFinalFormCalculatorConfigItem;

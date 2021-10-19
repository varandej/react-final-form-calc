import * as React from 'react';
import {
  Button, Divider, Form, Grid,
} from 'semantic-ui-react';
import { omit } from 'lodash/fp';
import { Form as FinalForm, FormRenderProps } from 'react-final-form';
import {
  TFinalFormCalculatorFieldsConfigItem, TFinalFormCalculatorOwnProps, TFinalFormCalculatorValues,
} from './final-form-calculator-types';
import {
  createFinalFormRecordLvlValidator, createIntialValuesFromConfig,
} from './final-form-calculator-utils';
import { FF_CALC_BTNS_CONFIG } from './final-form-calculator-constants';
import { FinalFormCalculatorField } from './components';

type TProps = TFinalFormCalculatorOwnProps;

/**
 * Контроллер конфигурируемого калькулятора
 */
export const FinalFormCalculatorController = React.memo<TProps>(
  ({
    decorators,
    externalValues,
    fieldsConfig,
    initialValuesConfig,
    validationConfig,
  }) => {
    // Флаг, который мы будем использовать для сброса формы
    const [resetTrigger, setResetTrigger] = React.useState(true);

    /**
     * Мемоизированные начальные значения формы
     * Пересчет приведет к сбросу значений калькулятора к начальным
     */
    const initialValues: TFinalFormCalculatorValues = React.useMemo(
      () => ({
        ...createIntialValuesFromConfig(initialValuesConfig, externalValues),
        resetTrigger,
      }),
      [
        externalValues,
        initialValuesConfig,
        resetTrigger,
      ],
    );

    /**
     * Мемоизированный валидатор
     */
    const reacordLvlValidator = React.useMemo(
      () => createFinalFormRecordLvlValidator(validationConfig),
      [validationConfig],
    );

    /**
     * Обработчик отправки формы
     * @param {TFinalFormCalculatorValues} values
     * @returns {void}
     */
    const handleSubmit = (values: TFinalFormCalculatorValues): void => {
      alert(
        JSON.stringify(
          omit(['resetTrigger'], values),
          null,
          4,
        ),
      );
    }

    /**
     * Обработчик клика по кнопке сброса
     * @returns {void}
     */
    const handleResetBtnClick = (): void => { setResetTrigger(!resetTrigger); };

    return (
      <FinalForm
        key={JSON.stringify(initialValues)}
        decorators={decorators}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={reacordLvlValidator}
        render={
          ({ handleSubmit: combinedSubmit }: FormRenderProps) => (
            <Form onSubmit={combinedSubmit}>
              <Grid>
                <Grid.Row>
                  {
                    fieldsConfig.map(
                      (
                        {
                          name,
                          placeholder,
                          width,
                          ...rest
                        }: TFinalFormCalculatorFieldsConfigItem,
                        i: number,
                      ) => (
                        <Grid.Column
                          key={name || `placeholder_${i}`}
                          textAlign="left"
                          width={width}
                         >
                           {
                             placeholder
                              ? <Divider hidden />
                              : (
                                <FinalFormCalculatorField
                                {...rest}
                                name={name}
                              />
                              )
                           }
                        </Grid.Column>
                      ),
                    )
                  }
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column
                    floated="right"
                    width={2}
                  >
                    <Button
                      {...FF_CALC_BTNS_CONFIG.RESET}
                      onClick={handleResetBtnClick}
                    />
                  </Grid.Column>

                  <Grid.Column width={4}>
                    <Button {...FF_CALC_BTNS_CONFIG.SUBMIT} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          )
        }
      />
    );
  },
);

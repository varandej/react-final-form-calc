import * as React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { Form, Input } from 'semantic-ui-react';
import { TFinalFormCalculatorFieldOwnProps } from './final-form-calculator-field-types';
import './final-form-calculator-field.css';

type TProps = TFinalFormCalculatorFieldOwnProps;

/**
 * Компонент поля ФФ формы
 */
export const FinalFormCalculatorField = (
  {
    control,
    format,
    hidden,
    name = '',
    ...rest
  }: TProps,
) => (
  <Field
    format={format}
    key={name}
    name={name}
    render={
      ({ input, meta }: FieldRenderProps<React.ReactNode>) => {
        /**
         * Обрабатываем разные типы полей
         */
        const onChange = (
          _: any,
          {
            checked,
            type,
            value,
          }: {
            checked?: boolean,
            type: string,
            value: any,
          },
        ) => {
          switch (type) {
            case 'checkbox':
              input.onChange(checked);

              break;
            default:
              input.onChange(value);
          }
        };

        return (
          hidden
            ? null
            : (
              <Form.Field
                {...input}
                {...rest}
                checked={input.value}
                className="calc-field"
                control={control || Input}
                error={meta.error}
                onChange={onChange}
              />
            )
        );
      }
    }
  />
);

import { ButtonProps, DropdownItemProps } from 'semantic-ui-react';
import { AVAILABLE_PRODUCT_LIST, TProduct } from '../offer-list';
import { EPayemntType } from './final-form-calculator-enums';

export const FF_CALC_BTNS_CONFIG: Record<string, ButtonProps> = {
  RESET: {
    basic: true,
    color: 'yellow',
    content: 'Сброс',
    fluid: true,
    icon: 'undo',
    type: 'button',
  },
  SUBMIT: {
    color: 'yellow',
    content: 'Поехали!',
    fluid: true,
    type: 'submit',
  },
};

export const PAYMENT_TYPE_DROPDOWN_OPTION_LIST: DropdownItemProps[] = [
  {
    key: EPayemntType.Annuity,
    text: 'Аннуитетный',
    value: EPayemntType.Annuity,
  },
  {
    key: EPayemntType.Differentiated,
    text: 'Дифференцированный',
    value: EPayemntType.Differentiated,
  },
];

// ломаем тип, чтобы ts не орал на объект к value
export const PRODUCT_DROPDOWN_OPTION_LIST: Record<string, any>[] = AVAILABLE_PRODUCT_LIST.map(
  (product: TProduct) => ({
    key: product.id,
    text: product.name,
    value: product,
  }),
);

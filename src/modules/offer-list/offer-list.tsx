import * as React from 'react';
import { Radio, Table } from 'semantic-ui-react';
import { noop } from 'lodash';
import { TProduct } from './offer-list-types';
import { AVAILABLE_PRODUCT_LIST } from './offer-list-constants';

type TProps = {
  selectedProductId: string | undefined,
  onSelectCallBack: (product: any) => void;
};

/**
 * Компонент списка предложений
 */
export const OfferList = React.memo<TProps>(
  ({
    selectedProductId,
    onSelectCallBack = noop,
  }) => {
    /**
     * Обработчик выбора предложения
     * @param {any} _
     * @param {TProduct} value 
     */
    const handleSelect = (product: TProduct) => () => { onSelectCallBack(product); };

    return(
      <Table selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell content="Наименование педложения" />
            <Table.HeaderCell content="Базовая ставка" />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            AVAILABLE_PRODUCT_LIST.map(
              (product: TProduct) => (
                <Table.Row onClick={handleSelect(product)}>
                  <Table.Cell>
                    <Radio
                      checked={selectedProductId === product.id}
                      name="prod"
                    />
                  </Table.Cell>

                  <Table.Cell content={product.name} />
                  <Table.Cell content={product.baseRate} />
                </Table.Row>
              ),
            )
          }
        </Table.Body>
      </Table>
    );
  },
);

import * as React from 'react';
import { Label, Radio, Table } from 'semantic-ui-react';
import { noop } from 'lodash';
import { TProduct } from './offer-list-types';
import { AVAILABLE_PRODUCT_LIST } from './offer-list-constants';
import { EOfferListTableColumns } from './offer-list-enums';

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
      <Table
        attached
        selectable
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell content={EOfferListTableColumns.Name} />
            <Table.HeaderCell content={EOfferListTableColumns.BaseRate} />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            AVAILABLE_PRODUCT_LIST.map(
              (product: TProduct) => (
                <Table.Row onClick={handleSelect(product)}>
                  <Table.Cell width={1} >
                    <Label color="green" ribbon>
                      <Radio
                        checked={selectedProductId === product.id}
                        name="prod"
                      />
                    </Label>
                  </Table.Cell>

                  <Table.Cell
                    content={product.name}
                    width={9}
                  />

                  <Table.Cell
                    content={product.baseRate}
                    width={6}
                  />
                </Table.Row>
              ),
            )
          }
        </Table.Body>
      </Table>
    );
  },
);

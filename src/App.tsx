import * as React from 'react';
import Logo from './assets/logo.png';
import 'semantic-ui-css/semantic.min.css'
import {
  CheckboxProps, Divider, Grid, Header, Image, Radio, Segment,
} from 'semantic-ui-react';
import {
  ECalcTypes,
  FF_CALC_CONFIGS,
  FinalFormCalculator,
  OfferList,
  TProduct,
} from './modules';
import './app.css';

const CALC_TYPE_TO_RADIO_LABEL_MAP = {
  [ECalcTypes.LoanByIncome]: 'ПК (по доходу)',
  [ECalcTypes.LoanBySum]: 'ПК (по сумме кредита)',
  [ECalcTypes.Primitive]: 'ПК (простейший)',
  [ECalcTypes.Mortgage]: 'Ипотека',
};
const CALC_TYPE_TO_PRODUCT_LIST_AVAILABILITY_MAP = {
  [ECalcTypes.LoanByIncome]: true,
  [ECalcTypes.LoanBySum]: false,
  [ECalcTypes.Mortgage]: true,
  [ECalcTypes.Primitive]: false,
};

/**
 * Root component
 */
export const App = () => {
  const [selectedCalcType, setCalcType] = React.useState<ECalcTypes>(ECalcTypes.Primitive);
  const [selectedProduct, setProduct] = React.useState<TProduct | null>(null);

  /**
   * Хэндлер изменения значения радиогруппы
   * @param {any} _
   * @param {CheckboxProps} props
   * @returns {void}
   */
  const handleRadioChange = (_: any, { value }: CheckboxProps): void => {
    setProduct(null);
    setCalcType(value as ECalcTypes);
  };

  return (
    <div className="app">
      <div className="wrapper">
          <Grid>
            <Grid.Row>
              <Grid.Column width={12}>
                {
                  CALC_TYPE_TO_PRODUCT_LIST_AVAILABILITY_MAP[selectedCalcType] && (
                    <OfferList
                      selectedProductId={selectedProduct?.id}
                      onSelectCallBack={setProduct}
                    />
                  )
                }

                <Segment
                  attached
                  color={CALC_TYPE_TO_PRODUCT_LIST_AVAILABILITY_MAP[selectedCalcType] ? 'green' : undefined}
                >
                  <Header
                    icon='rub'
                    as="h2"
                    content="Калькулятор"
                  />
                </Segment>

                <Segment attached>
                  <FinalFormCalculator
                    externalValues={{ product: selectedProduct }}
                    {...FF_CALC_CONFIGS[selectedCalcType]}
                  />
                </Segment>
              </Grid.Column>

              <Grid.Column
                verticalAlign="middle"
                textAlign="left"
                width={4}
              >
                {
                  Object
                    .values(ECalcTypes)
                    .map(
                      (calcType: ECalcTypes) => (
                        <Segment vertical>
                          <Radio
                            checked={calcType === selectedCalcType}
                            label={CALC_TYPE_TO_RADIO_LABEL_MAP[calcType]}
                            onClick={handleRadioChange}
                            value={calcType}
                          />
                        </Segment>
                      )
                    )
                }

                <Divider hidden />
                <Image src={Logo} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
      </div>
    </div>
  );
};

export default App;

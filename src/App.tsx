import * as React from 'react';
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
import reactLogoPath from './assets/react-logo.svg';
import ffLogoPath from './assets/ff-logo.png';
import './app.css';

const MAIN_TITLE = 'FF Calculator';
const CALC_TYPE_TO_RADIO_LABEL_MAP = {
  [ECalcTypes.LoanByIncome]: 'ПК по доходу',
  [ECalcTypes.LoanBySum]: 'ПК по сумме кредита',
  [ECalcTypes.Primitive]: 'ПК простейший',
};
const CALC_TYPE_TO_PRODUCT_LIST_AVAILABILITY_MAP = {
  [ECalcTypes.LoanByIncome]: true,
  [ECalcTypes.LoanBySum]: false,
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
    setCalcType(value as ECalcTypes);
  };

  return (
    <div className="app">
      <div className="wrapper">
        <Segment
          attached="top"
          color="yellow"
        >
          <Header
            as="h1"
            color="yellow"
          >
            <Image
              size="huge"
              src={reactLogoPath}
            />

            <Image
              size="small"
              src={ffLogoPath}
            />

            <Header.Content>
              {MAIN_TITLE}
            </Header.Content>
          </Header>
        </Segment>
      
        <Segment attached>
          <Grid divided>
            <Grid.Row>
              <Grid.Column width={12}>
                {
                  CALC_TYPE_TO_PRODUCT_LIST_AVAILABILITY_MAP[selectedCalcType] && (
                    <>
                      <OfferList
                        selectedProductId={selectedProduct?.id}
                        onSelectCallBack={setProduct}
                      />

                      <Divider hidden />
                    </>
                  )
                }

                <FinalFormCalculator
                  externalValues={{ product: selectedProduct }}
                  {...FF_CALC_CONFIGS[selectedCalcType]}
                />
              </Grid.Column>

              <Grid.Column
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
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    </div>
  );
};

export default App;

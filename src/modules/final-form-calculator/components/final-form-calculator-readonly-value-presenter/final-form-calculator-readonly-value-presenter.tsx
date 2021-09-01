import * as React from 'react';
import { Grid } from 'semantic-ui-react';

const PLACEHOLDER = '-';

type TProps = {
  propName?: string;
  value: any;
};

/**
 * Компонент простейшего отображения содержимого филда
 */
export const FinalFormCalculatorReadonlyValuePresenter = ({ propName, value }: TProps) => (
  <Grid columns={1}>
    <Grid.Row>
      <Grid.Column>
        <b>{(propName ? value?.[propName] : value) || PLACEHOLDER}</b>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

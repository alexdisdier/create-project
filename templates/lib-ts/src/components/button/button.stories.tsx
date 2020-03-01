import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  text,
  boolean,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Button from '.';

const stories = storiesOf('Button', module);

stories.addDecorator(withKnobs);

stories.add('default', () => {

  const hasOnClick = boolean('Has onClick', true);

  return (
    <Button
      onClick={hasOnClick ? action('clicked') : undefined}
      color={text('Custom color', '')}
      disabled={boolean('Disabled', false)}
    >
      {text('Label', 'I am THE button')}
    </Button>
  );
});

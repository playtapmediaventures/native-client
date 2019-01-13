import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import { Link } from '../src/links';

storiesOf('Link', module).add('with a valid result', () => (
  <Link
    href="https://www.google.com"
    pid={12345}
    offer_id="offerId"
    img="http://msclvr.cairnlabs.com/images/gen/f39c9d05-c9e7-43e7-94dd-9364e382fe81.jpg"
    head="The Artist"
    loc="Madison Square Garden"
    sub="$99.99"
  />
));

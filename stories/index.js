/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import { Link, Links } from '../src/links';

const generateOptions = () =>
  [0, 1, 2, 3, 4, 5].map(i => ({
    href: 'https://www.google.com',
    offer_id: `offer${i}`,
    img:
      'https://media.ticketmaster.com/en-us/dam/a/375/9762c506-c0d5-479c-a022-6a1473c6b375_1008721_EVENT_DETAIL_PAGE_16_9.jpg',
    head: "DMX - 20 Year Anniversary Tour - It's Dark and Hell is Hot",
    loc: 'Madison Square Garden',
    sub: `$99.9${i}`
  }));

addDecorator(withA11y);
addDecorator(withKnobs);

storiesOf('Link', module).add('with a valid result', () => {
  const head = text('Heading', `DMX - 20 Year Anniversary Tour - It's Dark and Hell is Hot`);
  const location = text('Location', 'Madison Square Garden');
  const sub = number('Price', 99);

  return (
    <Link
      href="https://www.google.com"
      pid={12345}
      offer_id="offerId"
      img="https://media.ticketmaster.com/en-us/dam/a/375/9762c506-c0d5-479c-a022-6a1473c6b375_1008721_EVENT_DETAIL_PAGE_16_9.jpg"
      head={head}
      position={0}
      loc={location}
      sub={`$${sub}.99`}
    />
  );
});

storiesOf('Links', module).add('with valid results', () => {
  const options = generateOptions();
  return (
    <div>
      <Links pid={12345} options={options} />
    </div>
  );
});

import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import { Link, Links } from '../src/links';

const generateOptions = () =>
  [0, 1, 2, 3, 4, 5].map(i => ({
    href: 'https://www.google.com',
    offer_id: `offer${i}`,
    img:
      'https://media.ticketmaster.com/en-us/dam/a/889/730b3fe6-0831-4d69-ae67-1748413c6889_982471_EVENT_DETAIL_PAGE_16_9.jpg',
    head: 'Cardi B.',
    loc: 'Madison Square Garden',
    sub: `$99.9${i}`
  }));

storiesOf('Link', module).add('with a valid result', () => (
  <Link
    href="https://www.google.com"
    pid={12345}
    offer_id="offerId"
    img="https://media.ticketmaster.com/en-us/dam/a/889/730b3fe6-0831-4d69-ae67-1748413c6889_982471_EVENT_DETAIL_PAGE_16_9.jpg"
    head="Cardi B."
    position={0}
    loc="Madison Square Garden"
    sub="$99.99"
  />
));

storiesOf('Links', module).add('with valid results', () => {
  const options = generateOptions();
  return (
    <div>
      <Links pid={12345} options={options} />
    </div>
  );
});

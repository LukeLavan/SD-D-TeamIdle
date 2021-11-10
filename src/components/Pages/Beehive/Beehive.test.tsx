/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { render } from '@testing-library/react';
import userEvent, { TargetElement } from '@testing-library/user-event';
import Beehive from './Beehive';

it('renders without crashing', () => {
  const div = render(<Beehive />);
  expect(div);
});

it('has a working buzz buzz buzz button', () => {
  // make sure nectar starts at 0, and nothing else is changing nectar
  localStorage.nectar = 0;
  localStorage.workersAssignedDanceFloor = 0;
  localStorage.workersAssignedRefinery = 0;

  const div = render(<Beehive />);

  // make sure we have everything we need
  const bbbB = div.container.querySelector('#buzzBuzzBuzzButton')?.firstChild
    ?.firstChild as TargetElement;
  expect(bbbB).toBeInTheDocument();

  const nectar = div.container.querySelector('#numnectar');
  expect(nectar).toBeInTheDocument();
  expect(nectar?.innerHTML).toBe('0');

  // try a single click
  userEvent.click(bbbB);
  expect(nectar?.innerHTML).toBe('1');

  // try many clicks, bringing us to full nectar capacity
  for (let i = 0; i < 100; ++i) userEvent.click(bbbB);
  expect(nectar?.innerHTML).toBe(localStorage.maxNectar);
});

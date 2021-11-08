/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Bees from './bees';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('test the total bees', () => {
  localStorage.bees = '1';
  localStorage.idleWorkers = '3';
  localStorage.drones = '2';
  localStorage.workersAssignedDanceFloor = '1';
  localStorage.workersAssignedFactory = '1';
  localStorage.workersAssignedHatchery = '3';
  localStorage.workersAssignedRefinery = '1';

  const beesDom = render(<Bees />);
  const totalBeeNumber = beesDom.container.querySelector('#numOfBees');

  expect(totalBeeNumber.innerHTML).toBe('12');
});

test('test the workers ', () => {
  localStorage.idleWorkers = '102';

  const beesDom = render(<Bees />);
  const workerNumber = beesDom.container.querySelector('#numOfWorkers');

  expect(workerNumber.innerHTML).toBe('102');
});

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Bees from '../bees';
import { render } from '@testing-library/react';

test('the total adults number', () => {
  localStorage.bees = '1';
  localStorage.idleWorkers = '3';
  localStorage.drones = '2';
  localStorage.workersAssignedDanceFloor = '1';
  localStorage.workersAssignedFactory = '1';
  localStorage.workersAssignedHatchery = '3';
  localStorage.workersAssignedRefinery = '1';
  localStorage.workersAssignedLibrary = '0';

  const beesDom = render(<Bees />);
  const totalBeeNumber = beesDom.container.querySelector(
    '#totaladultsAssigned'
  ) as Element;

  expect(totalBeeNumber.innerHTML).toBe('12');
});

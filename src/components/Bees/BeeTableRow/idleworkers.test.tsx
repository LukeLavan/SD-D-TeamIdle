/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Bees from '../bees';
import { render } from '@testing-library/react';

test('the idle workers number', () => {
  localStorage.idleWorkers = '102';

  const beesDom = render(<Bees />);
  const workerNumber = beesDom.container.querySelector(
    '#idleworkersAssigned'
  ) as Element;

  expect(workerNumber.innerHTML).toBe('102');
});

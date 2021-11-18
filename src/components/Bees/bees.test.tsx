/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Bees from './bees';
import { render } from '@testing-library/react';

it('renders without crashing', () => {
  const structuresDom = render(<Bees />);
  expect(structuresDom);
});

// BeeTableRow is responsible for each row of bees table

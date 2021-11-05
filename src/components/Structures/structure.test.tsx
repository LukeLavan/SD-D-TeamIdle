/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { render } from '@testing-library/react';
import Structures from './structure';

// test that the honeycomb structures are rendered correctly
it('renders without crashing', () => {
  const structuresDom = render(<Structures />);
  expect(structuresDom);
});

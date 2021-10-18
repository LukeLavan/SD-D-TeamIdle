/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import ReactDOM from 'react-dom';
import FrontPage from './FrontPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FrontPage />, div);
});

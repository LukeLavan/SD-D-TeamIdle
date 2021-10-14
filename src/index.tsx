/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Beehive from './components/Main_Page/FrontPage';

ReactDOM.render(
  <React.StrictMode>
    <Beehive />
  </React.StrictMode>,
  document.getElementById('root')
);

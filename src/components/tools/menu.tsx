/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import './menu.css';

import { loadPage } from './loadScreens';

function MenuBar(): JSX.Element {
  return (
    <div className="topnave">
      <a className="active" onClick={() => loadPage(1)}>
        Beehive
      </a>
      <a onClick={() => loadPage(2)}>Upgrade</a>
      <a onClick={() => loadPage(3)}>Tech Tree</a>
      <a onClick={() => loadPage(4)}>Statistics</a>
      <a onClick={() => loadPage(5)}>Settings</a>
    </div>
  );
}

export default MenuBar;

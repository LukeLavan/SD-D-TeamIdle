/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import './menu.css';

import { loadPage } from './loadScreens';
import { pageIds } from '../../constants/constants';

function MenuBar(): JSX.Element {
  return (
    <div className="topnave">
      <a className="active" onClick={() => loadPage(pageIds.BEEHIVE_ID)}>
        Beehive
      </a>
      <a onClick={() => loadPage(pageIds.HATCHERY_ID)}>Hatchery</a>
      {/*<a onClick={() => loadPage(pageIds.UPGRADE_ID)}>Upgrade</a>*/}
      <a onClick={() => loadPage(pageIds.TECH_TREE_ID)}>Tech Tree</a>
      {/*<a onClick={() => loadPage(pageIds.STATISTICS_ID)}>Statistics</a>*/}
      <a onClick={() => loadPage(pageIds.SETTINGS_ID)}>Settings</a>
    </div>
  );
}

export default MenuBar;

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import MenuBar from '../tools/menu';
import Beehive from '../Pages/Beehive';

import './FrontPage.css';

function FrontPage(): JSX.Element {
  return (
    <div>
      <div>
        <MenuBar></MenuBar>
      </div>
      <div id="page1">
        <Beehive></Beehive>
      </div>
      <div id="page2">Upgrades page</div>
      <div id="page3">Tech tree page</div>
      <div id="page4">Statistics page</div>
      <div id="page5">Settings page</div>
    </div>
  );
}

export default FrontPage;

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import MenuBar from '../tools/menu';
import Beehive from '../Pages/Beehive';

import './FrontPage.css';
import Settings from '../Pages/Settings';
import timer from '../tools/timer';
import Hatchery from '../Pages/Hatchery';

function FrontPage(): JSX.Element {
  timer();
  return (
    <div>
      <div>
        <MenuBar />
      </div>
      <div id="page1">
        <Beehive />
      </div>
      <div id="page2">
        <Hatchery />
      </div>
      <div id="page3">Upgrade page</div>
      <div id="page4">Tech tree page</div>
      <div id="page5">Statistics page</div>
      <div id="page6">
        <Settings />
      </div>
    </div>
  );
}

export default FrontPage;

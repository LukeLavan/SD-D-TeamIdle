/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import './Beehive.css';

import Honey from '../Resources/Honey/honey';
import Nectar from '../Resources/Nectar/nectar';
import Honeycomb from '../Resources/Honeycomb/honeycomb';
import Royaljelly from '../Resources/Royaljelly/royaljelly';

import Bees from '../Bees/bees';
import Foragers from '../Bees/foragers';
import Refiners from '../Bees/refiners';

import Structures from '../Structures/structure';

function Beehive(): JSX.Element {
  return (
    <div>
      <div id="Left_Side_Beehive">
        <div id="ResourceTable">
          <div>
            <Honey></Honey>
            <Nectar></Nectar>
            <Honeycomb></Honeycomb>
            <Royaljelly></Royaljelly>
          </div>
        </div>
        <div id="BeeTypeTable">
          <div>
            <Bees></Bees>
            <Foragers></Foragers>
            <Refiners></Refiners>
          </div>
        </div>
      </div>
      <div id="Right_Side_Beehive">
        <Structures></Structures>
      </div>
    </div>
  );
}

export default Beehive;

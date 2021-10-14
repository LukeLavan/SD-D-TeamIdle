/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import './allBees.css';

import CustomBeeHook from './beeHooks';
import { useBetween } from 'use-between';

function Bees(): JSX.Element {
  const NAME = 'Adult Bees';
  const { bees } = useBetween(CustomBeeHook);

  return (
    <div>
      <div>
        <table id="BeesTable">
          <tr>
            <td className="BeeTd">{NAME}</td>
            <td id="numOfBees" className="BeeTd">
              {bees}
            </td>
            <td className="BeeTd">/MAX</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Bees;

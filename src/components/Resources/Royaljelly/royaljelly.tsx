/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import './royaljelly.css';

import { useBetween } from 'use-between';
import CustomResourceHook from '../resourceHook';

function Royaljelly(): JSX.Element {
  const { royalJelly } = useBetween(CustomResourceHook);
  const NAME = 'Royaljelly';

  return (
    <div>
      <table id="RoyalJellyTable">
        <tr>
          <td className="royaljellytd">{NAME}</td>
          <td className="royaljellytd" id="royaljellyAmount">
            {royalJelly.toFixed(2)}
          </td>
          <td className="royaljellytd">/MAX</td>
          <td className="royaljellytd">+RATE/s</td>
        </tr>
      </table>
    </div>
  );
}

export default Royaljelly;

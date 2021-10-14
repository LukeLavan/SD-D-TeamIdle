/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import './honeycomb.css';

import { useBetween } from 'use-between';
import CustomResourceHook from '../resourceHook';

function Honeycomb(): JSX.Element {
  const { honeycomb } = useBetween(CustomResourceHook);
  const NAME = 'Honeycomb';

  return (
    <div>
      <table id="HoneycombTable">
        <tr>
          <td className="honeycolbtd">{NAME}</td>
          <td className="honeycolbtd" id="honeyCombAmount">
            {honeycomb}
          </td>
          <td className="honeycolbtd">/MAX</td>
          <td className="honeycolbtd">+RATE/s</td>
        </tr>
      </table>
    </div>
  );
}

export default Honeycomb;

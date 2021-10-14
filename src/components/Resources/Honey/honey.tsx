/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import './honey.css';

import { useBetween } from 'use-between';
import CustomResourceHook from '../resourceHook';

function Honey(): JSX.Element {
  const { honey } = useBetween(CustomResourceHook);
  const NAME = 'Honey';

  return (
    <div>
      <table id="HoneyTable">
        <tr>
          <td className="honeytd">{NAME}</td>
          <td className="honeytd">{honey}</td>
          <td className="honeytd">/MAX</td>
          <td className="honeytd">+RATE/s</td>
        </tr>
      </table>
    </div>
  );
}

export default Honey;

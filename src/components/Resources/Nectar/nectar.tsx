/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import './nectar.css';

import { useBetween } from 'use-between';
import CustomResourceHook from '../resourceHook';

function Nectar(): JSX.Element {
  const { nectar } = useBetween(CustomResourceHook);

  const NAME = 'Nectar';

  return (
    <div>
      <table id="NectarTable">
        <tr>
          <td className="nectartd">{NAME}</td>
          <td className="nectartd">{nectar}</td>
          <td className="nectartd">/MAX</td>
          <td className="nectartd">+RATE/s</td>
        </tr>
      </table>
    </div>
  );
}

export default Nectar;

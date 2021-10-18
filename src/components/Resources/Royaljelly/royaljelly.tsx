/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import './royaljelly.css';

import { useBetween } from 'use-between';
import CustomResourceHook from '../../tools/CustomResourceHook';
import CustomBeeHook from '../../tools/CustomBeeHook';
import { staticConstants } from '../../../constants/constants';

function Royaljelly(): JSX.Element {
  const { royalJelly, maxRoyalJelly } = useBetween(CustomResourceHook);
  const { workersAssignedHatchery } = useBetween(CustomBeeHook);
  const NAME = 'Royaljelly';

  const calcRoyalJellyPerSecond = () => {
    return workersAssignedHatchery * staticConstants.ROYAL_JELLY_BY_BEE;
  };

  return (
    <div>
      <table id="RoyalJellyTable">
        <tbody>
          <tr>
            <td className="royaljellytd">{NAME}</td>
            <td className="royaljellytd" id="royaljellyAmount">
              {royalJelly.toFixed(2)}
            </td>
            <td className="royaljellytd">/{maxRoyalJelly}</td>
            <td className="royaljellytd">+{calcRoyalJellyPerSecond()}/s</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Royaljelly;

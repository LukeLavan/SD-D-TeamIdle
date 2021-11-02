/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import './nectar.css';

import { useBetween } from 'use-between';
import CustomResourceHook from '../../tools/CustomResourceHook';
import CustomBeeHook from '../../tools/CustomBeeHook';
import CustomTechHook from '../../tools/CustomTechHook';
import { staticConstants } from '../../../constants/constants';

function Nectar(): JSX.Element {
  const { nectar, maxNectar, honey, maxHoney } = useBetween(CustomResourceHook);
  const { workersAssignedDanceFloor, workersAssignedRefinery } =
    useBetween(CustomBeeHook);
  const techData = useBetween(CustomTechHook);
  const NAME = 'Nectar';

  const nectarPerSecond =
    techData.techHoneyMultiplier *
      workersAssignedDanceFloor *
      staticConstants.NECTAR_BY_BEE -
    (honey !== maxHoney
      ? workersAssignedRefinery * staticConstants.NECTAR_TO_HONEY_COST
      : 0);

  return (
    <div>
      <table id="NectarTable">
        <tbody>
          <tr>
            <td className="nectartd">{NAME}</td>
            <td className="nectartd">{nectar}</td>
            <td className="nectartd">/{maxNectar}</td>
            <td className="nectartd">
              {nectarPerSecond > 0 ? '+' : ''}
              {nectarPerSecond}/s
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Nectar;

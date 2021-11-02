/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import './honey.css';

import { useBetween } from 'use-between';
import CustomResourceHook from '../../tools/CustomResourceHook';
import CustomBeeHook from '../../tools/CustomBeeHook';
import CustomTechHook from '../../tools/CustomTechHook';
import { staticConstants } from '../../../constants/constants';

function Honey(): JSX.Element {
  const { nectar, honey, maxHoney, honeycomb, maxHoneycomb } =
    useBetween(CustomResourceHook);
  const { workersAssignedRefinery, workersAssignedFactory } =
    useBetween(CustomBeeHook);
  const TechData = useBetween(CustomTechHook);
  const NAME = 'Honey';

  let honeyPerSecond = 0;
  if (nectar > staticConstants.NECTAR_TO_HONEY_COST)
    honeyPerSecond += workersAssignedRefinery;
  if (honeycomb !== maxHoneycomb)
    honeyPerSecond -=
      workersAssignedFactory *
      (staticConstants.HONEY_TO_HONEYCOMB_COST -
        TechData.techHoneyConversionReducer);

  return (
    <div>
      <table id="HoneyTable">
        <tbody>
          <tr>
            <td className="honeytd">{NAME}</td>
            <td className="honeytd">{honey}</td>
            <td className="honeytd">/{maxHoney}</td>
            <td className="honeytd">
              {honeyPerSecond > 0 ? '+' : ''}
              {honeyPerSecond}/s
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Honey;

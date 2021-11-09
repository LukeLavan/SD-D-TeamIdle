/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import './honeycomb.css';

import { useBetween } from 'use-between';
import CustomResourceHook from '../../tools/CustomResourceHook';
import { staticConstants } from '../../../constants/constants';
import CustomBeeHook from '../../tools/CustomBeeHook';
import CustomTechHook from '../../tools/CustomTechHook';

function Honeycomb(): JSX.Element {
  const { honey, honeycomb, maxHoneycomb } = useBetween(CustomResourceHook);
  const { workersAssignedFactory } = useBetween(CustomBeeHook);
  const techData = useBetween(CustomTechHook);
  const NAME = 'Honeycomb';

  const honeycombPerSecond =
    honey >
    staticConstants.HONEY_TO_HONEYCOMB_COST -
      techData.techHoneyConversionReducer
      ? workersAssignedFactory
      : 0;

  return (
    <div>
      <table id="HoneycombTable">
        <tbody>
          <tr>
            <td className="honeycolbtd">{NAME}</td>
            <td className="honeycolbtd" id="honeyCombAmount">
              {honeycomb}
            </td>
            <td className="honeycolbtd">/{maxHoneycomb}</td>
            <td className="honeycolbtd">
              {honeycombPerSecond > 0 ? '+' : ''}
              {honeycombPerSecond}/s
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Honeycomb;

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import './allBees.css';

import CustomBeeHook from '../tools/CustomBeeHook';
import { useBetween } from 'use-between';
import CustomStructureHook from '../tools/CustomStructureHook';

function Bees(): JSX.Element {
  const NAME = 'Total Adults';
  const beeData = useBetween(CustomBeeHook);
  const { levelHomes } = useBetween(CustomStructureHook);

  // TODO: move this somewhere more convenient?
  const calcTotalAdults = () => {
    return (
      beeData.bees +
      beeData.idleWorkers +
      beeData.drones +
      beeData.workersAssignedDanceFloor +
      beeData.workersAssignedFactory +
      beeData.workersAssignedHatchery +
      beeData.workersAssignedRefinery
    );
  };

  return (
    <div>
      <div>
        <table id="BeesTable">
          <tbody>
            <tr>
              <td className="BeeTd">{NAME}</td>
              <td id="numOfBees" className="BeeTd">
                {calcTotalAdults()}
              </td>
              <td className="BeeTd">/{levelHomes}</td>
            </tr>
            <tr>
              <td className="BeeTd">Idle Workers</td>
              <td id="numOfWorkers" className="BeeTd">
                {beeData.idleWorkers}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bees;

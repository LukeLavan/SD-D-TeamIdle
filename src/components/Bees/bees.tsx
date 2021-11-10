/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import './bees.css';

import CustomBeeHook from '../tools/CustomBeeHook';
import CustomStructureHook from '../tools/CustomStructureHook';
import { useBetween } from 'use-between';

import BeeTableRow from './BeeTableRow/BeeTableRow';

function Bees(): JSX.Element {
  const beeData = useBetween(CustomBeeHook);
  const structureData = useBetween(CustomStructureHook);

  // TODO: move this somewhere more convenient?
  const calcTotalAdults = () => {
    return (
      beeData.bees +
      beeData.idleWorkers +
      beeData.drones +
      beeData.workersAssignedDanceFloor +
      beeData.workersAssignedFactory +
      beeData.workersAssignedHatchery +
      beeData.workersAssignedRefinery +
      beeData.workersAssignedLibrary
    );
  };

  return (
    <div>
      <div>
        <table id="BeesTable">
          <tbody>
            <BeeTableRow
              name="total adults"
              workersAssigned={calcTotalAdults()}
              setWorkersAssigned={undefined}
              levelStructure={structureData.levelHomes}
            />
            <BeeTableRow
              name="drones"
              workersAssigned={beeData.drones}
              setWorkersAssigned={undefined}
              levelStructure={undefined}
            />
            <BeeTableRow
              name="idle workers"
              workersAssigned={beeData.idleWorkers}
              setWorkersAssigned={undefined}
              levelStructure={undefined}
            />
            <BeeTableRow
              name="foragers"
              workersAssigned={beeData.workersAssignedDanceFloor}
              setWorkersAssigned={beeData.setWorkersAssignedDanceFloor}
              levelStructure={structureData.levelDanceFloor}
            />
            <BeeTableRow
              name="refiners"
              workersAssigned={beeData.workersAssignedRefinery}
              setWorkersAssigned={beeData.setWorkersAssignedRefinery}
              levelStructure={structureData.levelRefinery}
            />
            <BeeTableRow
              name="architects"
              workersAssigned={beeData.workersAssignedFactory}
              setWorkersAssigned={beeData.setWorkersAssignedFactory}
              levelStructure={structureData.levelFactory}
            />
            <BeeTableRow
              name="nurses"
              workersAssigned={beeData.workersAssignedHatchery}
              setWorkersAssigned={beeData.setWorkersAssignedHatchery}
              levelStructure={structureData.levelHatchery}
            />
            <BeeTableRow
              name="scientists"
              workersAssigned={beeData.workersAssignedLibrary}
              setWorkersAssigned={beeData.setWorkersAssignedLibrary}
              levelStructure={structureData.levelLibrary}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bees;

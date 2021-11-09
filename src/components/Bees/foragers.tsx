/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import './allBees.css';

import { useBetween } from 'use-between';

import { BsPatchPlusFill, BsPatchMinusFill } from 'react-icons/bs';
import CustomBeeHook from '../tools/CustomBeeHook';
import CustomStructureHook from '../tools/CustomStructureHook';

function Foragers(): JSX.Element {
  const {
    idleWorkers,
    setIdleWorkers,
    workersAssignedDanceFloor,
    setWorkersAssignedDanceFloor
  } = useBetween(CustomBeeHook);
  const { levelDanceFloor } = useBetween(CustomStructureHook);
  const NAME = 'Foragers';

  const assignForager = () => {
    if (idleWorkers >= 1 && levelDanceFloor > workersAssignedDanceFloor) {
      setWorkersAssignedDanceFloor((previousForagers) => previousForagers + 1);
      setIdleWorkers((previousBees) => previousBees - 1);
    }
  };

  const unassignForager = () => {
    if (workersAssignedDanceFloor <= 0) {
      return;
    }
    setWorkersAssignedDanceFloor((previousForagers) => previousForagers - 1);
    setIdleWorkers((previousBees) => previousBees + 1);
  };

  return (
    <div>
      <table id="ForagersTable">
        <tbody>
          <tr>
            <td className="ForagerId">{NAME}</td>
            <td id="foragersAssignedDanceFloor" className="ForagerId">
              {workersAssignedDanceFloor}
            </td>
            <td className="ForagerId">/{levelDanceFloor}</td>
            <td className="ForagerIdButtons">
              <button
                id="foragerPlusButton"
                className="plusButton"
                onClick={assignForager}
              >
                <BsPatchPlusFill className="ButtonIcon" size="2em" />
              </button>
            </td>
            <td className="ForagerIdButtons">
              <button
                id="foragerMinusButton"
                className="minusButton"
                onClick={unassignForager}
              >
                <BsPatchMinusFill className="ButtonIcon" size="2em" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Foragers;

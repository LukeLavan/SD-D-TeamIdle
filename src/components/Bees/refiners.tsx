/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import './allBees.css';

import { useBetween } from 'use-between';

import { BsPatchPlusFill, BsPatchMinusFill } from 'react-icons/bs';
import CustomBeeHook from '../tools/CustomBeeHook';
import CustomStructureHook from '../tools/CustomStructureHook';

function Refiners(): JSX.Element {
  const {
    idleWorkers,
    setIdleWorkers,
    workersAssignedRefinery,
    setWorkersAssignedRefinery
  } = useBetween(CustomBeeHook);
  const { levelRefinery } = useBetween(CustomStructureHook);
  const NAME = 'Refiners';

  const assignRefiner = () => {
    if (idleWorkers >= 1 && levelRefinery > workersAssignedRefinery) {
      setWorkersAssignedRefinery((previousRefiners) => previousRefiners + 1);
      setIdleWorkers((previousBees) => previousBees - 1);
    }
  };

  const unassignRefiner = () => {
    if (workersAssignedRefinery <= 0) {
      return;
    }
    setWorkersAssignedRefinery((previousRefiners) => previousRefiners - 1);
    setIdleWorkers((previousBees) => previousBees + 1);
  };

  return (
    <div>
      <table id="RefinersTable">
        <tbody>
          <tr>
            <td className="RefinerId">{NAME}</td>
            <td id="refinersAssignedRefinery" className="RefinerId">
              {workersAssignedRefinery}
            </td>
            <td className="RefinerId">/{levelRefinery}</td>
            <td className="RefinerIdButtons">
              <button
                id="refinersPlusButton"
                className="plusButton"
                onClick={assignRefiner}
              >
                <BsPatchPlusFill className="ButtonIcon" size="2em" />
              </button>
            </td>
            <td className="RefinerIdButtons">
              <button
                id="refinersMinusButton"
                className="minusButton"
                onClick={unassignRefiner}
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

export default Refiners;

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import './allBees.css';

import { useBetween } from 'use-between';

import { BsPatchPlusFill, BsPatchMinusFill } from 'react-icons/bs';
import CustomBeeHook from '../tools/CustomBeeHook';
import CustomStructureHook from '../tools/CustomStructureHook';

function Nurses(): JSX.Element {
  const {
    idleWorkers,
    setIdleWorkers,
    workersAssignedHatchery,
    setWorkersAssignedHatchery
  } = useBetween(CustomBeeHook);
  const { levelHatchery } = useBetween(CustomStructureHook);
  const NAME = 'Nurses';

  const assignNurse = () => {
    if (idleWorkers >= 1 && levelHatchery > workersAssignedHatchery) {
      setWorkersAssignedHatchery((previousNurses) => previousNurses + 1);
      setIdleWorkers((previousBees) => previousBees - 1);
    }
  };

  const unassignNurse = () => {
    if (workersAssignedHatchery <= 0) {
      return;
    }
    setWorkersAssignedHatchery((previousNurses) => previousNurses - 1);
    setIdleWorkers((previousBees) => previousBees + 1);
  };

  return (
    <div>
      <table id="NursesTable">
        <tbody>
          <tr>
            <td className="NurseId">{NAME}</td>
            <td className="NurseId">{workersAssignedHatchery}</td>
            <td className="NurseId">/{levelHatchery}</td>
            <td className="NurseIdButtons">
              <button className="plusButton" onClick={assignNurse}>
                <BsPatchPlusFill className="ButtonIcon" size="2em" />
              </button>
            </td>
            <td className="NurseIdButtons">
              <button className="minusButton" onClick={unassignNurse}>
                <BsPatchMinusFill className="ButtonIcon" size="2em" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Nurses;

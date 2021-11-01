/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import './allBees.css';

import { useBetween } from 'use-between';

import { BsPatchPlusFill, BsPatchMinusFill } from 'react-icons/bs';
import CustomBeeHook from '../tools/CustomBeeHook';
import CustomStructureHook from '../tools/CustomStructureHook';

function Architects(): JSX.Element {
  const {
    idleWorkers,
    setIdleWorkers,
    workersAssignedFactory,
    setWorkersAssignedFactory
  } = useBetween(CustomBeeHook);
  const { levelFactory } = useBetween(CustomStructureHook);
  const NAME = 'Architects';

  const assignArchitect = () => {
    if (idleWorkers >= 1 && levelFactory > workersAssignedFactory) {
      setWorkersAssignedFactory((previousArchitects) => previousArchitects + 1);
      setIdleWorkers((previousBees) => previousBees - 1);
    }
  };

  const unassignArchitect = () => {
    if (workersAssignedFactory <= 0) {
      return;
    }
    setWorkersAssignedFactory((previousArchitects) => previousArchitects - 1);
    setIdleWorkers((previousBees) => previousBees + 1);
  };

  return (
    <div>
      <table id="ArchitectsTable">
        <tbody>
          <tr>
            <td className="ArchitectId">{NAME}</td>
            <td id="architectsAssignedFactory" className="ArchitectId">
              {workersAssignedFactory}
            </td>
            <td className="ArchitectId">/{levelFactory}</td>
            <td className="ArchitectIdButtons">
              <button
                id="architectsPlusButton"
                className="plusButton"
                onClick={assignArchitect}
              >
                <BsPatchPlusFill className="ButtonIcon" size="2em" />
              </button>
            </td>
            <td className="ArchitectIdButtons">
              <button
                id="architectsMinusButton"
                className="minusButton"
                onClick={unassignArchitect}
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

export default Architects;

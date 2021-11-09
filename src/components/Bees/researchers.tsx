/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import './allBees.css';

import { useBetween } from 'use-between';

import { BsPatchPlusFill, BsPatchMinusFill } from 'react-icons/bs';
import CustomBeeHook from '../tools/CustomBeeHook';
import CustomStructureHook from '../tools/CustomStructureHook';

function Researchers(): JSX.Element {
  const {
    idleWorkers,
    setIdleWorkers,
    workersAssignedLibrary,
    setWorkersAssignedLibrary
  } = useBetween(CustomBeeHook);
  const { levelLibrary } = useBetween(CustomStructureHook);
  const NAME = 'Researchers';

  const assignResearcher = () => {
    if (idleWorkers >= 1 && levelLibrary > workersAssignedLibrary) {
      setWorkersAssignedLibrary(
        (previousResearchers) => previousResearchers + 1
      );
      setIdleWorkers((previousBees) => previousBees - 1);
    }
  };

  const unassignResearcher = () => {
    if (workersAssignedLibrary <= 0) {
      return;
    }
    setWorkersAssignedLibrary((previousResearchers) => previousResearchers - 1);
    setIdleWorkers((previousBees) => previousBees + 1);
  };

  return (
    <div>
      <table id="ResearchersTable">
        <tbody>
          <tr>
            <td className="ResearcherId">{NAME}</td>
            <td className="ResearcherId">{workersAssignedLibrary}</td>
            <td className="ResearcherId">/{levelLibrary}</td>
            <td className="ResearcherIdButtons">
              <button className="plusButton" onClick={assignResearcher}>
                <BsPatchPlusFill className="ButtonIcon" size="2em" />
              </button>
            </td>
            <td className="RefinerIdButtons">
              <button className="minusButton" onClick={unassignResearcher}>
                <BsPatchMinusFill className="ButtonIcon" size="2em" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Researchers;

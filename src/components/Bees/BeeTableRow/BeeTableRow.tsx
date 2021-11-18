/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { useBetween } from 'use-between';
import CustomBeeHook from '../../tools/CustomBeeHook';

import { BsPatchPlusFill, BsPatchMinusFill } from 'react-icons/bs';

interface Props {
  name: string;
  workersAssigned: number;
  setWorkersAssigned: React.Dispatch<React.SetStateAction<number>> | undefined;
  levelStructure: number | undefined;
}

function Foragers(props: Props): JSX.Element {
  const { idleWorkers, setIdleWorkers } = useBetween(CustomBeeHook);

  const assign = () => {
    if (
      props.setWorkersAssigned &&
      props.levelStructure &&
      idleWorkers >= 1 &&
      props.levelStructure > props.workersAssigned
    ) {
      props.setWorkersAssigned((previousWorkers) => previousWorkers + 1);
      setIdleWorkers((previousBees) => previousBees - 1);
    }
  };

  const unassign = () => {
    if (!props.setWorkersAssigned || props.workersAssigned <= 0) {
      return;
    }
    props.setWorkersAssigned((previousWorkers) => previousWorkers - 1);
    setIdleWorkers((previousBees) => previousBees + 1);
  };

  return (
    <tr id={props.name + 'TableRow'}>
      <td className="BeeTd">{props.name}</td>
      <td id={props.name.replace(' ', '') + 'Assigned'} className="BeeTd">
        {props.workersAssigned}
      </td>
      <td className="BeeTd">
        {props.levelStructure ? '/' + props.levelStructure : false}
      </td>
      <td className="BeeTdButtons">
        {props.setWorkersAssigned ? (
          <button
            id={props.name + 'PlusButton'}
            className="PlusButton"
            onClick={assign}
          >
            <BsPatchPlusFill className="ButtonIcon" size="2em" />
          </button>
        ) : (
          false
        )}
      </td>
      <td className="BeeTdButtons">
        {props.setWorkersAssigned ? (
          <button
            id={props.name + 'MinusButton'}
            className="MinusButton"
            onClick={unassign}
          >
            <BsPatchMinusFill className="ButtonIcon" size="2em" />
          </button>
        ) : (
          false
        )}
      </td>
    </tr>
  );
}

export default Foragers;

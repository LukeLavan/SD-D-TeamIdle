/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Button from '../Button/Button';

interface Props {
  workers: number;
  setWorkers: React.Dispatch<React.SetStateAction<number>>;
  workersAssignedDanceFloor: number;
  setWorkersAssignedDanceFloor: React.Dispatch<React.SetStateAction<number>>;
  workersAssignedRefinery: number;
  setWorkersAssignedRefinery: React.Dispatch<React.SetStateAction<number>>;
  workersAssignedHatchery: number;
  setWorkersAssignedHatchery: React.Dispatch<React.SetStateAction<number>>;
  workersAssignedFactory: number;
  setWorkersAssignedFactory: React.Dispatch<React.SetStateAction<number>>;
  levelDanceFloor: number;
  levelRefinery: number;
  levelHatchery: number;
  levelFactory: number;
}

function Schedule(props: Props): JSX.Element {
  const canAssignDanceFloor = () =>
    props.workersAssignedDanceFloor < props.levelDanceFloor &&
    props.workers > 0;
  const assignDanceFloor = () => {
    if (canAssignDanceFloor()) {
      props.setWorkers((previousWorkers) => previousWorkers - 1);
      props.setWorkersAssignedDanceFloor(
        (previousWorkers) => previousWorkers + 1
      );
    }
  };
  const canUnassignDanceFloor = () => props.workersAssignedDanceFloor > 0;
  const unassignDanceFloor = () => {
    if (canUnassignDanceFloor()) {
      props.setWorkersAssignedDanceFloor(
        (previousWorkers) => previousWorkers - 1
      );
      props.setWorkers((previousWorkers) => previousWorkers + 1);
    }
  };

  return (
    <div className="Schedule">
      workers assigned to Dance Floor: {props.workersAssignedDanceFloor}
      <div className="row">
        <div className="column left">
          <Button
            onClick={assignDanceFloor}
            disabled={!canAssignDanceFloor()}
            size="small"
          >
            +
          </Button>
        </div>
        <div className="column right">
          <Button
            onClick={unassignDanceFloor}
            disabled={!canUnassignDanceFloor()}
            size="small"
          >
            -
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Schedule;

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

  const canAssignRefinery = () =>
    props.workersAssignedRefinery < props.levelRefinery && props.workers > 0;
  const assignRefinery = () => {
    if (canAssignRefinery()) {
      props.setWorkers((previousWorkers) => previousWorkers - 1);
      props.setWorkersAssignedRefinery(
        (previousWorkers) => previousWorkers + 1
      );
    }
  };
  const canUnassignRefinery = () => props.workersAssignedRefinery > 0;
  const unassignRefinery = () => {
    if (canUnassignRefinery()) {
      props.setWorkersAssignedRefinery(
        (previousWorkers) => previousWorkers - 1
      );
      props.setWorkers((previousWorkers) => previousWorkers + 1);
    }
  };

  const canAssignHatchery = () =>
    props.workersAssignedHatchery < props.levelHatchery && props.workers > 0;
  const assignHatchery = () => {
    if (canAssignHatchery()) {
      props.setWorkers((previousWorkers) => previousWorkers - 1);
      props.setWorkersAssignedHatchery(
        (previousWorkers) => previousWorkers + 1
      );
    }
  };
  const canUnassignHatchery = () => props.workersAssignedHatchery > 0;
  const unassignHatchery = () => {
    if (canUnassignHatchery()) {
      props.setWorkersAssignedHatchery(
        (previousWorkers) => previousWorkers - 1
      );
      props.setWorkers((previousWorkers) => previousWorkers + 1);
    }
  };

  const canAssignFactory = () =>
    props.workersAssignedFactory < props.levelFactory && props.workers > 0;
  const assignFactory = () => {
    if (canAssignFactory()) {
      props.setWorkers((previousWorkers) => previousWorkers - 1);
      props.setWorkersAssignedFactory((previousWorkers) => previousWorkers + 1);
    }
  };
  const canUnassignFactory = () => props.workersAssignedFactory > 0;
  const unassignFactory = () => {
    if (canUnassignFactory()) {
      props.setWorkersAssignedFactory((previousWorkers) => previousWorkers - 1);
      props.setWorkers((previousWorkers) => previousWorkers + 1);
    }
  };

  // TODO: hatchery
  // TODO: factory

  return (
    <div className="Schedule">
      <div className="Schedule DanceFloor">
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
      <div className="Schedule Refinery">
        workers assigned to Refinery: {props.workersAssignedRefinery}
        <div className="row">
          <div className="column left">
            <Button
              onClick={assignRefinery}
              disabled={!canAssignRefinery()}
              size="small"
            >
              +
            </Button>
          </div>
          <div className="column right">
            <Button
              onClick={unassignRefinery}
              disabled={!canUnassignRefinery()}
              size="small"
            >
              -
            </Button>
          </div>
        </div>
      </div>
      <div className="Schedule Hatchery">
        workers assigned to Hatchery: {props.workersAssignedHatchery}
        <div className="row">
          <div className="column left">
            <Button
              onClick={assignHatchery}
              disabled={!canAssignHatchery()}
              size="small"
            >
              +
            </Button>
          </div>
          <div className="column right">
            <Button
              onClick={unassignHatchery}
              disabled={!canUnassignHatchery()}
              size="small"
            >
              -
            </Button>
          </div>
        </div>
      </div>
      <div className="Schedule Factory">
        workers assigned to Factory: {props.workersAssignedFactory}
        <div className="row">
          <div className="column left">
            <Button
              onClick={assignFactory}
              disabled={!canAssignFactory()}
              size="small"
            >
              +
            </Button>
          </div>
          <div className="column right">
            <Button
              onClick={unassignFactory}
              disabled={!canUnassignFactory()}
              size="small"
            >
              -
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;

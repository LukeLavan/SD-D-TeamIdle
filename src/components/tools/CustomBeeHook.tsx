/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { usePersistentState } from '../../PersistentState';
import { variableDefaults } from '../../constants/constants';

const CustomBeeHook = (): {
  bees: number;
  setBees: React.Dispatch<React.SetStateAction<number>>;
  workersAssignedDanceFloor: number;
  setWorkersAssignedDanceFloor: React.Dispatch<React.SetStateAction<number>>;
  workersAssignedRefinery: number;
  setWorkersAssignedRefinery: React.Dispatch<React.SetStateAction<number>>;
  workersAssignedHatchery: number;
  setWorkersAssignedHatchery: React.Dispatch<React.SetStateAction<number>>;
  workersAssignedFactory: number;
  setWorkersAssignedFactory: React.Dispatch<React.SetStateAction<number>>;
  workersAssignedLibrary: number;
  setWorkersAssignedLibrary: React.Dispatch<React.SetStateAction<number>>;
  drones: number;
  setDrones: React.Dispatch<React.SetStateAction<number>>;
  idleWorkers: number;
  setIdleWorkers: React.Dispatch<React.SetStateAction<number>>;
} => {
  const [bees, setBees] = usePersistentState('bees', variableDefaults.bees);
  const [workersAssignedDanceFloor, setWorkersAssignedDanceFloor] =
    usePersistentState(
      'workersAssignedDanceFloor',
      variableDefaults.assignedWorkers.DanceFloor
    );
  const [workersAssignedRefinery, setWorkersAssignedRefinery] =
    usePersistentState(
      'workersAssignedRefinery',
      variableDefaults.assignedWorkers.Refinery
    );
  const [workersAssignedHatchery, setWorkersAssignedHatchery] =
    usePersistentState(
      'workersAssignedHatchery',
      variableDefaults.assignedWorkers.Hatchery
    );
  const [workersAssignedFactory, setWorkersAssignedFactory] =
    usePersistentState(
      'workersAssignedFactory',
      variableDefaults.assignedWorkers.Factory
    );
  const [workersAssignedLibrary, setWorkersAssignedLibrary] =
    usePersistentState(
      'workersAssignedLibrary',
      variableDefaults.assignedWorkers.Library
    );
  const [drones, setDrones] = usePersistentState(
    'drones',
    variableDefaults.drones
  );
  const [idleWorkers, setIdleWorkers] = usePersistentState(
    'idleWorkers',
    variableDefaults.idleWorkers
  );

  return {
    bees,
    setBees,
    workersAssignedDanceFloor,
    setWorkersAssignedDanceFloor,
    workersAssignedRefinery,
    setWorkersAssignedRefinery,
    workersAssignedHatchery,
    setWorkersAssignedHatchery,
    workersAssignedFactory,
    setWorkersAssignedFactory,
    workersAssignedLibrary,
    setWorkersAssignedLibrary,
    drones,
    setDrones,
    idleWorkers,
    setIdleWorkers
  };
};

export default CustomBeeHook;

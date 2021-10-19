/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { variableDefaults } from '../../constants/constants';
import { usePersistentState } from '../../PersistentState';

const CustomStructureHook = (): {
  levelDanceFloor: number;
  setLevelDanceFloor: React.Dispatch<React.SetStateAction<number>>;
  costNextLevelDanceFloor: number;
  setCostNextLevelDanceFloor: React.Dispatch<React.SetStateAction<number>>;
  levelRefinery: number;
  setLevelRefinery: React.Dispatch<React.SetStateAction<number>>;
  costNextLevelRefinery: number;
  setCostNextLevelRefinery: React.Dispatch<React.SetStateAction<number>>;
  levelHomes: number;
  setLevelHomes: React.Dispatch<React.SetStateAction<number>>;
  costNextLevelHomes: number;
  setCostNextLevelHomes: React.Dispatch<React.SetStateAction<number>>;
  levelHatchery: number;
  setLevelHatchery: React.Dispatch<React.SetStateAction<number>>;
  costNextLevelHatchery: number;
  setCostNextLevelHatchery: React.Dispatch<React.SetStateAction<number>>;
  levelFactory: number;
  setLevelFactory: React.Dispatch<React.SetStateAction<number>>;
  costNextLevelFactory: number;
  setCostNextLevelFactory: React.Dispatch<React.SetStateAction<number>>;
  levelLibrary: number;
  setLevelLibrary: React.Dispatch<React.SetStateAction<number>>;
  costNextLevelLibrary: number;
  setCostNextLevelLibrary: React.Dispatch<React.SetStateAction<number>>;
  levelStorage: number;
  setLevelStorage: React.Dispatch<React.SetStateAction<number>>;
  costNextLevelStorage: number;
  setCostNextLevelStorage: React.Dispatch<React.SetStateAction<number>>;
} => {
  const [levelDanceFloor, setLevelDanceFloor] = usePersistentState(
    'levelDanceFloor',
    variableDefaults.structureLevels.DanceFloor
  );
  const [costNextLevelDanceFloor, setCostNextLevelDanceFloor] =
    usePersistentState(
      'costNextLevelDanceFloor',
      variableDefaults.structureCosts.DanceFloor
    );
  const [levelRefinery, setLevelRefinery] = usePersistentState(
    'levelRefinery',
    variableDefaults.structureLevels.Refinery
  );
  const [costNextLevelRefinery, setCostNextLevelRefinery] = usePersistentState(
    'costNextLevelRefinery',
    variableDefaults.structureCosts.Refinery
  );
  const [levelHomes, setLevelHomes] = usePersistentState(
    'levelHomes',
    variableDefaults.structureLevels.Homes
  );
  const [costNextLevelHomes, setCostNextLevelHomes] = usePersistentState(
    'costNextLevelHomes',
    variableDefaults.structureCosts.Homes
  );
  const [levelHatchery, setLevelHatchery] = usePersistentState(
    'levelHatchery',
    variableDefaults.structureLevels.Hatchery
  );
  const [costNextLevelHatchery, setCostNextLevelHatchery] = usePersistentState(
    'costNextLevelHatchery',
    variableDefaults.structureCosts.Hatchery
  );
  const [levelFactory, setLevelFactory] = usePersistentState(
    'levelFactory',
    variableDefaults.structureLevels.Factory
  );
  const [costNextLevelFactory, setCostNextLevelFactory] = usePersistentState(
    'costNextLevelFactory',
    variableDefaults.structureCosts.Factory
  );
  const [levelLibrary, setLevelLibrary] = usePersistentState(
    'levelLibrary',
    variableDefaults.structureLevels.Library
  );
  const [costNextLevelLibrary, setCostNextLevelLibrary] = usePersistentState(
    'costNextLevelLibrary',
    variableDefaults.structureCosts.Library
  );
  const [levelStorage, setLevelStorage] = usePersistentState(
    'levelStorage',
    variableDefaults.structureLevels.Storage
  );
  const [costNextLevelStorage, setCostNextLevelStorage] = usePersistentState(
    'costNextLevelStorage',
    variableDefaults.structureCosts.Storage
  );

  return {
    levelDanceFloor,
    setLevelDanceFloor,
    costNextLevelDanceFloor,
    setCostNextLevelDanceFloor,
    levelRefinery,
    setLevelRefinery,
    costNextLevelRefinery,
    setCostNextLevelRefinery,
    levelHomes,
    setLevelHomes,
    costNextLevelHomes,
    setCostNextLevelHomes,
    levelHatchery,
    setLevelHatchery,
    costNextLevelHatchery,
    setCostNextLevelHatchery,
    levelFactory,
    setLevelFactory,
    costNextLevelFactory,
    setCostNextLevelFactory,
    levelLibrary,
    setLevelLibrary,
    costNextLevelLibrary,
    setCostNextLevelLibrary,
    levelStorage,
    setLevelStorage,
    costNextLevelStorage,
    setCostNextLevelStorage
  };
};

export default CustomStructureHook;

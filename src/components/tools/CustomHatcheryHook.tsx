/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { usePersistentState } from '../../PersistentState';
import { variableDefaults } from '../../constants/constants';

const CustomHatcheryHook = (): {
  broodcells: typeof variableDefaults.broodcells;
  setBroodcells: React.Dispatch<React.SetStateAction<typeof broodcells>>;
  ticksNextEgg: number;
  setTicksNextEgg: React.Dispatch<React.SetStateAction<number>>;
  eggReady: boolean;
  setEggReady: React.Dispatch<React.SetStateAction<boolean>>;
} => {
  const [broodcells, setBroodcells] = usePersistentState(
    'broodcells',
    variableDefaults.broodcells
  );
  const [ticksNextEgg, setTicksNextEgg] = usePersistentState(
    'ticksNextEgg',
    variableDefaults.ticksNextEgg
  );
  const [eggReady, setEggReady] = usePersistentState(
    'eggReady',
    variableDefaults.eggReady
  );
  return {
    broodcells,
    setBroodcells,
    ticksNextEgg,
    setTicksNextEgg,
    eggReady,
    setEggReady
  };
};

export default CustomHatcheryHook;

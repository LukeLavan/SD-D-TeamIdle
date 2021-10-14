/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { usePersistentState } from '../../PersistentState';
import { variableDefaults } from '../../constants/constants';

const CustomBeeHook = (): {
  bees: number;
  setBees: React.Dispatch<React.SetStateAction<number>>;
  foragers: number;
  setForagers: React.Dispatch<React.SetStateAction<number>>;
  refiners: number;
  setRefiners: React.Dispatch<React.SetStateAction<number>>;
} => {
  const [bees, setBees] = usePersistentState('bees', variableDefaults.bees);
  const [foragers, setForagers] = usePersistentState(
    'foragers',
    variableDefaults.foragers
  );
  const [refiners, setRefiners] = usePersistentState(
    'refiners',
    variableDefaults.refiners
  );
  return { bees, setBees, foragers, setForagers, refiners, setRefiners };
};

export default CustomBeeHook;

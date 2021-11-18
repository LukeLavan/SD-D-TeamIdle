/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { usePersistentState } from '../../PersistentState';
import { variableDefaults } from '../../constants/constants';

const CustomHatcheryHook = (): {
  larvae: number;
  setLarvae: React.Dispatch<React.SetStateAction<number>>;
  pupae: number;
  setPupae: React.Dispatch<React.SetStateAction<number>>;
} => {
  const [larvae, setLarvae] = usePersistentState(
    'larvae',
    variableDefaults.larvae
  );
  const [pupae, setPupae] = usePersistentState('pupae', variableDefaults.pupae);
  if (pupae === null) setPupae(variableDefaults.pupae);

  return { larvae, setLarvae, pupae, setPupae };
};

export default CustomHatcheryHook;

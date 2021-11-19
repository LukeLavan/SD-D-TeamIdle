/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { usePersistentState } from '../../PersistentState';

const CustomTimerHook = (): {
  timerFlip: boolean;
  setTimerFlip: React.Dispatch<React.SetStateAction<boolean>>;
  resetTimer: () => void;
  timeStamp: number;
  setTimeStamp: React.Dispatch<React.SetStateAction<number>>;
} => {
  const [timerFlip, setTimerFlip] = usePersistentState('timerFlip', false);
  const [timeStamp, setTimeStamp] = usePersistentState('timeStamp', Date.now());
  const resetTimer = () => setTimerFlip((previous) => !previous);

  return {
    timerFlip,
    setTimerFlip,
    resetTimer,
    timeStamp,
    setTimeStamp
  };
};

export default CustomTimerHook;

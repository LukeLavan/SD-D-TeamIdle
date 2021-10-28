/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { usePersistentState } from '../../PersistentState';

const CustomTimerHook = (): {
  timeStamp: number;
  setTimeStamp: React.Dispatch<React.SetStateAction<number>>;
} => {
  const [timeStamp, setTimeStamp] = usePersistentState('timeStamp', Date.now());

  return {
    timeStamp,
    setTimeStamp
  };
};

export default CustomTimerHook;

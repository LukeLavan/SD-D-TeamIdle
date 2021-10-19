/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { useEffect, useState } from 'react';
import { useBetween } from 'use-between';
import CustomBeeHook from './CustomBeeHook';
import CustomHatcheryHook from './CustomHatcheryHook';
import CustomResourceHook from './CustomResourceHook';
import processTick from './processTick';

const timer = (): void => {
  const [timerFlip, setTimerFlip] = useState(false);
  const beeData = useBetween(CustomBeeHook);
  const resourceData = useBetween(CustomResourceHook);
  const hatcheryData = useBetween(CustomHatcheryHook);
  useEffect(() => {
    const interval = setInterval(() => {
      processTick(resourceData, beeData, hatcheryData);
      // signals that the timer should re-initialize
      setTimerFlip((p) => !p);
    }, 1000);
    return () => clearInterval(interval);
  }, [timerFlip]);
};

export default timer;
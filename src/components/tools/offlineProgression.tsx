/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { useEffect } from 'react';
import { useBetween } from 'use-between';

import CustomBeeHook from './CustomBeeHook';
import CustomHatcheryHook from './CustomHatcheryHook';
import CustomResourceHook from './CustomResourceHook';
import CustomTimerHook from './CustomTimerHook';

import processTick from './processTick';

/**
 * calculates how many ticks should have been processed between
 * now and the saved timestamp and processes that many ticks
 */
function offlineProgression(): void {
  const beeData = useBetween(CustomBeeHook);
  const resourceData = useBetween(CustomResourceHook);
  const hatcheryData = useBetween(CustomHatcheryHook);
  const timerData = useBetween(CustomTimerHook);

  useEffect(() => {
    if (Date.now() - timerData.timeStamp >= 1000) {
      const amountOfTicks = Math.floor(
        (Date.now() - timerData.timeStamp) / 1000
      );
      console.log('This amount of ticks: ' + amountOfTicks); //prints out tick amount so we know this is working ;P
      for (let i = 0; i < amountOfTicks; i++) {
        processTick(resourceData, beeData, hatcheryData, timerData);
      }
    }
  }, []);
}

export default offlineProgression;

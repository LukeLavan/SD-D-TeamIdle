/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { useEffect } from 'react';

import CustomResourceHook from './CustomResourceHook';
import CustomBeeHook from './CustomBeeHook';
import CustomStructureHook from './CustomStructureHook';
import CustomHatcheryHook from './CustomHatcheryHook';
import CustomTechHook from './CustomTechHook';
import CustomTimerHook from './CustomTimerHook';
import CustomWeatherHook from './CustomWeatherHook';
import { useBetween } from 'use-between';

import processTick from './processTick';

const timer = (): void => {
  const resourceData = useBetween(CustomResourceHook);
  const beeData = useBetween(CustomBeeHook);
  const structureData = useBetween(CustomStructureHook);
  const hatcheryData = useBetween(CustomHatcheryHook);
  const weatherData = useBetween(CustomWeatherHook);
  const timerData = useBetween(CustomTimerHook);
  const techData = useBetween(CustomTechHook);
  useEffect(() => {
    const interval = setInterval(() => {
      processTick(
        resourceData,
        beeData,
        structureData,
        hatcheryData,
        weatherData,
        techData,
        timerData
      );
      // signals that the timer should re-initialize
      timerData.setTimerFlip((p) => !p);
    }, 1000);
    return () => clearInterval(interval);
  }, [timerData.timerFlip]);
};

export default timer;

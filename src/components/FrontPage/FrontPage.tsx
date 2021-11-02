/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import MenuBar from '../tools/menu';
import Beehive from '../Pages/Beehive';
import { useEffect } from 'react';
import { useBetween } from 'use-between';

import './FrontPage.css';
import Settings from '../Pages/Settings';
import timer from '../tools/timer';
import Hatchery from '../Pages/Hatchery';
import Tech from '../Pages/Tech';
import processTick from '../tools/processTick';
import CustomBeeHook from '../tools/CustomBeeHook';
import CustomHatcheryHook from '../tools/CustomHatcheryHook';
import CustomResourceHook from '../tools/CustomResourceHook';
import CustomTechHook from '../tools/CustomTechHook';
import CustomTimerHook from '../tools/CustomTimerHook';

function FrontPage(): JSX.Element {
  // process for offline progression ticks
  const beeData = useBetween(CustomBeeHook);
  const resourceData = useBetween(CustomResourceHook);
  const hatcheryData = useBetween(CustomHatcheryHook);
  const techData = useBetween(CustomTechHook);
  const timerData = useBetween(CustomTimerHook);
  useEffect(() => {
    if (Date.now() - timerData.timeStamp >= 1000) {
      const amountOfTicks = Math.floor(
        (Date.now() - timerData.timeStamp) / 1000
      );
      console.log('This amount of ticks: ' + amountOfTicks); //prints out tick amount so we know this is working ;P
      for (let i = 0; i < amountOfTicks; i++) {
        processTick(resourceData, beeData, hatcheryData, timerData, techData);
      }
    }
  }, []);

  timer();
  return (
    <div>
      <div>
        <MenuBar />
      </div>
      <div id="page1">
        <Beehive />
      </div>
      <div id="page2">
        <Hatchery />
      </div>
      <div id="page3">Upgrade page</div>
      <div id="page4">
        <Tech />
      </div>
      <div id="page5">Statistics page</div>
      <div id="page6">
        <Settings />
      </div>
    </div>
  );
}

export default FrontPage;

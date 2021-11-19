/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import CustomResourceHook from './CustomResourceHook';
import CustomBeeHook from './CustomBeeHook';
import CustomStructureHook from './CustomStructureHook';
import CustomHatcheryHook from './CustomHatcheryHook';
import CustomTechHook from './CustomTechHook';
import CustomTimerHook from './CustomTimerHook';
import CustomWeatherHook from './CustomWeatherHook';

import { processWeatherTick } from '../Weather/weather';
import { doneResearch } from '../Pages/Tech/Tech';
import { staticConstants } from '../../constants/constants';

const processTick = (
  resourceData: ReturnType<typeof CustomResourceHook>,
  beeData: ReturnType<typeof CustomBeeHook>,
  structureData: ReturnType<typeof CustomStructureHook>,
  hatcheryData: ReturnType<typeof CustomHatcheryHook>,
  weatherData: ReturnType<typeof CustomWeatherHook>,
  techData: ReturnType<typeof CustomTechHook>,
  timerData: ReturnType<typeof CustomTimerHook>
): void => {
  // forage for nectar
  for (let i = 0; i < beeData.workersAssignedDanceFloor; ++i) {
    if (weatherData.thunder) {
      break;
    }
    resourceData.setNectar((previousNectar): number => {
      const nextNectar =
        previousNectar +
        staticConstants.NECTAR_BY_BEE *
          weatherData.nectarBonus *
          techData.techHoneyMultiplier;
      if (nextNectar > resourceData.maxNectar) return resourceData.maxNectar;
      return nextNectar;
    });
  }

  // refine nectar into honey
  for (let i = 0; i < beeData.workersAssignedRefinery; ++i) {
    if (weatherData.thunder) {
      break;
    }
    resourceData.setHoney((previousHoney): number => {
      if (previousHoney >= resourceData.maxHoney) return resourceData.maxHoney;
      const nextHoney = previousHoney + 1;
      let canRefine = false;
      resourceData.setNectar((previousNectar): number => {
        const nextNectar =
          previousNectar - staticConstants.NECTAR_TO_HONEY_COST;
        if (nextNectar < 0) return previousNectar;
        canRefine = true;
        return nextNectar;
      });
      if (canRefine) {
        if (nextHoney > resourceData.maxHoney) return resourceData.maxHoney;
        return nextHoney;
      }
      return previousHoney;
    });
  }

  // refine honey into honeycomb
  for (let i = 0; i < beeData.workersAssignedFactory; ++i) {
    if (weatherData.thunder) {
      break;
    }
    resourceData.setHoneycomb((previousHoneycomb): number => {
      if (previousHoneycomb >= resourceData.maxHoneycomb)
        return resourceData.maxHoneycomb;
      const nextHoneycomb = previousHoneycomb + 1;
      let canFactor = false;
      resourceData.setHoney((previousHoney): number => {
        if (
          previousHoney <
          staticConstants.HONEY_TO_HONEYCOMB_COST -
            techData.techHoneyConversionReducer
        )
          return previousHoney;
        const nextHoney =
          previousHoney -
          (staticConstants.HONEY_TO_HONEYCOMB_COST -
            techData.techHoneyConversionReducer);
        canFactor = true;
        return nextHoney;
      });
      if (canFactor) {
        if (nextHoneycomb > resourceData.maxHoneycomb)
          return resourceData.maxHoneycomb;
        return nextHoneycomb;
      }
      return previousHoneycomb;
    });
  }

  // drones secrete royal jelly
  for (let i = 0; i < beeData.drones; ++i) {
    resourceData.setRoyalJelly((previousJelly): number => {
      const nextJelly =
        previousJelly +
        techData.techRoyalJellyMultiplier * staticConstants.ROYAL_JELLY_BY_BEE;
      if (nextJelly > resourceData.maxRoyalJelly)
        return resourceData.maxRoyalJelly;
      return nextJelly;
    });
  }

  // TODO: move this somewhere more convenient
  const calcTotalAdults = (): number => {
    return (
      beeData.bees +
      beeData.idleWorkers +
      beeData.drones +
      beeData.workersAssignedDanceFloor +
      beeData.workersAssignedFactory +
      beeData.workersAssignedHatchery +
      beeData.workersAssignedRefinery +
      beeData.workersAssignedLibrary
    );
  };

  // hatchery egg
  if (!hatcheryData.eggReady)
    hatcheryData.setTicksNextEgg((previousTicks) => {
      const nextTicks = previousTicks - 1;
      if (nextTicks > 0) return nextTicks;
      const newEggDuration = Math.floor(60 * Math.random());
      hatcheryData.setEggReady(true);
      return newEggDuration;
    });

  // hatchery babies
  for (let i = 0; i < hatcheryData.broodcells.length; ++i) {
    if (hatcheryData.broodcells[i].type === 'larva') {
      hatcheryData.setBroodcells((previousBroodcells) => {
        const newBroodcells = [...previousBroodcells];
        newBroodcells[i].ticksLeft -= 1;
        return newBroodcells;
      });
      if (hatcheryData.broodcells[i].ticksLeft === 0) {
        if (calcTotalAdults() < structureData.levelHomes) {
          hatcheryData.setBroodcells((previousBroodcells) => {
            const newBroodcells = [...previousBroodcells];

            if (newBroodcells[i].destiny === 'worker')
              beeData.setIdleWorkers(
                (previousIdleWorkers) => previousIdleWorkers + 1
              );
            else if (newBroodcells[i].destiny === 'drone')
              beeData.setDrones((previousDrones) => previousDrones + 1);

            newBroodcells[i].type = 'none';
            newBroodcells[i].destiny = 'awaiting egg';
            newBroodcells[i].ticksLeft = -1;

            return newBroodcells;
          });
        } else {
          hatcheryData.setBroodcells((previousBroodcells) => {
            const newBroodcells = [...previousBroodcells];
            newBroodcells[i].type = 'adult';
            return newBroodcells;
          });
        }
      }
    } else if (
      hatcheryData.broodcells[i].type === 'adult' &&
      calcTotalAdults() < structureData.levelHomes
    ) {
      hatcheryData.setBroodcells((previousBroodcells) => {
        const newBroodcells = [...previousBroodcells];
        newBroodcells[i].type = 'none';
        newBroodcells[i].ticksLeft = -1;
        beeData.setIdleWorkers(
          (previousIdleWorkers) => previousIdleWorkers + 1
        );
        return newBroodcells;
      });
    }
  }

  // Weather ticks
  processWeatherTick(weatherData);

  // librarians research technology
  if (techData.currentResearch != 'none') {
    for (let i = 0; i < beeData.workersAssignedLibrary; ++i) {
      techData.setResearchProgress((previousResearchProgress): number => {
        const nextResearchProgress = previousResearchProgress + 1;
        if (nextResearchProgress > techData.researchMax)
          return techData.researchMax;
        return nextResearchProgress;
      });
    }

    //check if research is finished
    doneResearch(techData);
  }

  // setting timeStamp to be the current time each ticks
  timerData.setTimeStamp(Date.now());
};

export default processTick;

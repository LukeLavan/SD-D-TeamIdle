/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { staticConstants } from '../../constants/constants';
import CustomBeeHook from './CustomBeeHook';
import CustomHatcheryHook from './CustomHatcheryHook';
import CustomResourceHook from './CustomResourceHook';
import CustomTimerHook from './CustomTimerHook';
import CustomTechHook from './CustomTechHook';

import { doneResearch } from '../Pages/Tech';

const processTick = (
  resourceData: ReturnType<typeof CustomResourceHook>,
  beeData: ReturnType<typeof CustomBeeHook>,
  hatcheryData: ReturnType<typeof CustomHatcheryHook>,
  techData: ReturnType<typeof CustomTechHook>,
  timerData: ReturnType<typeof CustomTimerHook>
): void => {
  // forage for nectar
  for (let i = 0; i < beeData.workersAssignedDanceFloor; ++i) {
    resourceData.setNectar((previousNectar): number => {
      const nextNectar =
        previousNectar +
        techData.techHoneyMultiplier * staticConstants.NECTAR_BY_BEE;
      if (nextNectar > resourceData.maxNectar) return resourceData.maxNectar;
      return nextNectar;
    });
  }

  // refine nectar into honey
  for (let i = 0; i < beeData.workersAssignedRefinery; ++i) {
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

  // nurses secrete royal jelly
  for (let i = 0; i < beeData.workersAssignedHatchery; ++i) {
    resourceData.setRoyalJelly((previousJelly): number => {
      const nextJelly =
        previousJelly +
        techData.techNurseMultiplier * staticConstants.ROYAL_JELLY_BY_BEE;
      if (nextJelly > resourceData.maxRoyalJelly)
        return resourceData.maxRoyalJelly;
      return nextJelly;
    });
  }

  // drones produce pupae
  for (let i = 0; i < beeData.drones; ++i) {
    hatcheryData.setPupae(
      (previousPupae) =>
        previousPupae +
        techData.techDroneMultiplier * staticConstants.PUPAE_BY_DRONE
    );
  }

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

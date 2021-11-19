/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import CustomBeeHook from '../../tools/CustomBeeHook';
import CustomResourceHook from '../../tools/CustomResourceHook';
import CustomStructureHook from '../../tools/CustomStructureHook';
import CustomHatcheryHook from '../../tools/CustomHatcheryHook';
import CustomTechHook from '../../tools/CustomTechHook';
import CustomWeatherHook from '../../tools/CustomWeatherHook';
import CustomTimerHook from '../../tools/CustomTimerHook';
import { useBetween } from 'use-between';

import { variableDefaults } from '../../../constants/constants';

import Button from '../../Button/Button';

/**
 * Settings page
 */
function Settings(): JSX.Element {
  const beeData = useBetween(CustomBeeHook);
  const resourceData = useBetween(CustomResourceHook);
  const structureData = useBetween(CustomStructureHook);
  const hatcheryData = useBetween(CustomHatcheryHook);
  const techData = useBetween(CustomTechHook);
  const weatherData = useBetween(CustomWeatherHook);
  const timerData = useBetween(CustomTimerHook);
  const reset = (): void => {
    beeData.setBees(variableDefaults.bees);
    beeData.setDrones(variableDefaults.drones);
    beeData.setIdleWorkers(variableDefaults.idleWorkers);
    beeData.setWorkersAssignedDanceFloor(
      variableDefaults.assignedWorkers.DanceFloor
    );
    beeData.setWorkersAssignedRefinery(
      variableDefaults.assignedWorkers.Refinery
    );
    beeData.setWorkersAssignedHatchery(
      variableDefaults.assignedWorkers.Hatchery
    );
    beeData.setWorkersAssignedFactory(variableDefaults.assignedWorkers.Factory);
    beeData.setWorkersAssignedLibrary(variableDefaults.assignedWorkers.Library);

    resourceData.setHoney(variableDefaults.honey);
    resourceData.setHoneycomb(variableDefaults.honeycomb);
    resourceData.setNectar(variableDefaults.nectar);
    resourceData.setRoyalJelly(variableDefaults.royalJelly);
    resourceData.setMaxNectar(variableDefaults.capacities.nectar);
    resourceData.setMaxHoney(variableDefaults.capacities.honey);
    resourceData.setMaxHoneycomb(variableDefaults.capacities.honeycomb);
    resourceData.setMaxRoyalJelly(variableDefaults.capacities.royalJelly);

    structureData.setLevelDanceFloor(
      variableDefaults.structureLevels.DanceFloor
    );
    structureData.setCostNextLevelDanceFloor(
      variableDefaults.structureCosts.DanceFloor
    );
    structureData.setLevelFactory(variableDefaults.structureLevels.Factory);
    structureData.setCostNextLevelFactory(
      variableDefaults.structureCosts.Factory
    );
    structureData.setLevelHatchery(variableDefaults.structureLevels.Hatchery);
    structureData.setCostNextLevelHatchery(
      variableDefaults.structureCosts.Hatchery
    );
    structureData.setLevelHomes(variableDefaults.structureLevels.Homes);
    structureData.setCostNextLevelHomes(variableDefaults.structureCosts.Homes);
    structureData.setLevelLibrary(variableDefaults.structureLevels.Library);
    structureData.setCostNextLevelLibrary(
      variableDefaults.structureCosts.Library
    );
    structureData.setLevelRefinery(variableDefaults.structureLevels.Refinery);
    structureData.setCostNextLevelRefinery(
      variableDefaults.structureCosts.Refinery
    );
    structureData.setLevelStorage(variableDefaults.structureLevels.Storage);
    structureData.setCostNextLevelStorage(
      variableDefaults.structureCosts.Storage
    );

    hatcheryData.setBroodcells([...variableDefaults.broodcells]);
    hatcheryData.setEggReady(variableDefaults.eggReady);
    hatcheryData.setTicksNextEgg(variableDefaults.ticksNextEgg);

    techData.setCurrentResearch(variableDefaults.currentResearch);
    techData.setResearchProgress(variableDefaults.researchProgress);
    techData.setResearchMax(variableDefaults.researchMax);
    techData.setHoney1(variableDefaults.techEnabled.honey1);
    techData.setHoney2(variableDefaults.techEnabled.honey2);
    techData.setHoney3(variableDefaults.techEnabled.honey3);
    techData.setDrone(variableDefaults.techEnabled.drone);
    techData.setNurse(variableDefaults.techEnabled.nurse);
    techData.setHoneyConversion(variableDefaults.techEnabled.honeyConversion);
    techData.setTechHoneyMultiplier(variableDefaults.techHoneyMultiplier);
    techData.setTechDroneMultiplier(variableDefaults.techDroneMultiplier);
    techData.setTechRoyalJellyMultiplier(
      variableDefaults.techRoyalJellyMultiplier
    );
    techData.setTechHoneyConversionReducer(
      variableDefaults.techHoneyConversionReducer
    );
    techData.setTechHoneycombEfficiency(1);

    weatherData.setMonth(variableDefaults.weather.month);
    weatherData.setDay(variableDefaults.weather.day);
    weatherData.setCounter(variableDefaults.weather.counter);
    weatherData.setNectarBonus(variableDefaults.weather.nectarBonus);
    weatherData.setThunder(variableDefaults.weather.thunder);
    weatherData.setRoyalJellyBonus(variableDefaults.weather.royalJellyBonus);
    weatherData.setWeather(variableDefaults.weather.weather);
    weatherData.setSeason(variableDefaults.weather.season);

    timerData.resetTimer();
  };
  return (
    <div className="Settings">
      <div id="reset">
        <Button onClick={reset} size={'small'} color={'red'}>
          reset
        </Button>
      </div>
    </div>
  );
}

export default Settings;

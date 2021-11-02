/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { useBetween } from 'use-between';
import { variableDefaults } from '../../constants/constants';
import CustomBeeHook from '../tools/CustomBeeHook';
import Button from '../Button/Button';
import CustomResourceHook from '../tools/CustomResourceHook';
import CustomStructureHook from '../tools/CustomStructureHook';
import CustomHatcheryHook from '../tools/CustomHatcheryHook';

function Settings(): JSX.Element {
  const beeData = useBetween(CustomBeeHook);
  const resourceData = useBetween(CustomResourceHook);
  const structureData = useBetween(CustomStructureHook);
  const hatcheryData = useBetween(CustomHatcheryHook);
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

    hatcheryData.setLarvae(variableDefaults.larvae);
    hatcheryData.setPupae(variableDefaults.pupae);
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

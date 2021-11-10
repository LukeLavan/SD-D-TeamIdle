/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import ResourceRow from './ResourceRow.tsx/ResourceRow';

import { useBetween } from 'use-between';
import { staticConstants } from '../../constants/constants';

import CustomResourceHook from '../tools/CustomResourceHook';
import CustomBeeHook from '../tools/CustomBeeHook';
import CustomTechHook from '../tools/CustomTechHook';

function resources(): JSX.Element {
  const ResourceData = useBetween(CustomResourceHook);
  const BeeData = useBetween(CustomBeeHook);
  const TechData = useBetween(CustomTechHook);
  const calcHoneyRate = () => {
    let honeyPerSecond = 0;
    if (ResourceData.nectar > staticConstants.NECTAR_TO_HONEY_COST)
      honeyPerSecond += BeeData.workersAssignedRefinery;
    if (ResourceData.honeycomb !== ResourceData.maxHoneycomb)
      honeyPerSecond -=
        BeeData.workersAssignedFactory *
        (staticConstants.HONEY_TO_HONEYCOMB_COST -
          TechData.techHoneyConversionReducer);
    return honeyPerSecond;
  };
  const calcNectarRate = () => {
    return (
      TechData.techHoneyMultiplier *
        BeeData.workersAssignedDanceFloor *
        staticConstants.NECTAR_BY_BEE -
      (ResourceData.honey !== ResourceData.maxHoney
        ? BeeData.workersAssignedRefinery * staticConstants.NECTAR_TO_HONEY_COST
        : 0)
    );
  };
  const calcHoneycombRate = () => {
    return ResourceData.honey >
      staticConstants.HONEY_TO_HONEYCOMB_COST -
        TechData.techHoneyConversionReducer
      ? BeeData.workersAssignedFactory
      : 0;
  };
  const calcRoyalJellyRate = () => {
    return (
      TechData.techNurseMultiplier *
      BeeData.workersAssignedHatchery *
      staticConstants.ROYAL_JELLY_BY_BEE
    );
  };
  return (
    <div>
      <ResourceRow
        name="nectar"
        value={ResourceData.nectar}
        max={ResourceData.maxNectar}
        rate={calcNectarRate()}
      />
      <ResourceRow
        name="honey"
        value={ResourceData.honey}
        max={ResourceData.maxHoney}
        rate={calcHoneyRate()}
      />
      <ResourceRow
        name="honeycomb"
        value={ResourceData.honeycomb}
        max={ResourceData.maxHoneycomb}
        rate={calcHoneycombRate()}
      />
      <ResourceRow
        name="royal jelly"
        value={ResourceData.royalJelly}
        max={ResourceData.maxRoyalJelly}
        rate={calcRoyalJellyRate()}
      />
    </div>
  );
}

export default resources;

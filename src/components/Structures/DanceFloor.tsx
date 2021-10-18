/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { useBetween } from 'use-between';
import { staticConstants } from '../../constants/constants';
import Button from '../Button/Button';
import CustomResourceHook from '../tools/CustomResourceHook';
import CustomStructureHook from '../tools/CustomStructureHook';

function DanceFloor(): JSX.Element {
  const structureData = useBetween(CustomStructureHook);
  const resourceData = useBetween(CustomResourceHook);

  const canUpgrade = () =>
    resourceData.honeycomb >= structureData.costNextLevelDanceFloor;

  const upgrade = () => {
    let canUpgrade = false;
    resourceData.setHoneycomb((previousHoneycomb) => {
      const nextHoneycomb =
        previousHoneycomb - structureData.costNextLevelDanceFloor;
      if (nextHoneycomb < 0) return previousHoneycomb;
      canUpgrade = true;
      return nextHoneycomb;
    });
    if (canUpgrade) {
      structureData.setLevelDanceFloor((previousLevel) => previousLevel + 1);
      structureData.setCostNextLevelDanceFloor(
        (previousCost) =>
          previousCost * staticConstants.STRUCTURE_SCALING.DanceFloor
      );
    }
  };

  return (
    <div id="DanceFloor">
      Dance Floor <br />
      level: {structureData.levelDanceFloor} <br />
      cost of next level: {structureData.costNextLevelDanceFloor} <br />
      <Button onClick={upgrade} disabled={!canUpgrade()} size="small">
        upgrade
      </Button>
    </div>
  );
}

export default DanceFloor;

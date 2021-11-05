/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { useBetween } from 'use-between';
import { staticConstants } from '../../constants/constants';
import Button from '../Button/Button';
import CustomResourceHook from '../tools/CustomResourceHook';
import CustomStructureHook from '../tools/CustomStructureHook';

function Hatchery(): JSX.Element {
  const structureData = useBetween(CustomStructureHook);
  const resourceData = useBetween(CustomResourceHook);

  const canUpgrade = () =>
    resourceData.honeycomb >= structureData.costNextLevelHatchery;

  const upgrade = () => {
    let canUpgrade = false;
    resourceData.setHoneycomb((previousHoneycomb) => {
      const nextHoneycomb =
        previousHoneycomb - structureData.costNextLevelHatchery;
      if (nextHoneycomb < 0) return previousHoneycomb;
      canUpgrade = true;
      return nextHoneycomb;
    });
    if (canUpgrade) {
      structureData.setLevelHatchery((previousLevel) => previousLevel + 1);
      structureData.setCostNextLevelHatchery(
        (previousCost) =>
          previousCost * staticConstants.STRUCTURE_SCALING.Hatchery
      );
    }
  };

  return (
    <div id="Hatchery">
      Hatchery <br />
      level:{' '}
      <div id="hatcheryLevel" style={{ display: 'inline-block' }}>
        {structureData.levelHatchery}
      </div>
      <br />
      cost of next level:{' '}
      <div id="hatcheryNextLevelCost" style={{ display: 'inline-block' }}>
        {structureData.costNextLevelHatchery}
      </div>
      <br />
      <div id="upgradeHatcheryButton">
        <Button onClick={upgrade} disabled={!canUpgrade()} size="small">
          upgrade
        </Button>
      </div>
    </div>
  );
}

export default Hatchery;

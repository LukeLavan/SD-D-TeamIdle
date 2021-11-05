/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { useBetween } from 'use-between';
import { staticConstants } from '../../constants/constants';
import Button from '../Button/Button';
import CustomResourceHook from '../tools/CustomResourceHook';
import CustomStructureHook from '../tools/CustomStructureHook';

function Refinery(): JSX.Element {
  const structureData = useBetween(CustomStructureHook);
  const resourceData = useBetween(CustomResourceHook);

  const canUpgrade = () =>
    resourceData.honeycomb >= structureData.costNextLevelRefinery;

  const upgrade = () => {
    let canUpgrade = false;
    resourceData.setHoneycomb((previousHoneycomb) => {
      const nextHoneycomb =
        previousHoneycomb - structureData.costNextLevelRefinery;
      if (nextHoneycomb < 0) return previousHoneycomb;
      canUpgrade = true;
      return nextHoneycomb;
    });
    if (canUpgrade) {
      structureData.setLevelRefinery((previousLevel) => previousLevel + 1);
      structureData.setCostNextLevelRefinery(
        (previousCost) =>
          previousCost * staticConstants.STRUCTURE_SCALING.Refinery
      );
    }
  };

  return (
    <div id="Refinery">
      Refinery <br />
      level:{' '}
      <div id="refineryLevel" style={{ display: 'inline-block' }}>
        {structureData.levelRefinery}
      </div>
      <br />
      cost of next level:{' '}
      <div id="refineryNextLevelCost" style={{ display: 'inline-block' }}>
        {structureData.costNextLevelRefinery}
      </div>
      <br />
      <div id="upgradeRefineryButton">
        <Button onClick={upgrade} disabled={!canUpgrade()} size="small">
          upgrade
        </Button>
      </div>
    </div>
  );
}

export default Refinery;

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { useBetween } from 'use-between';
import { staticConstants } from '../../constants/constants';
import Button from '../Button/Button';
import CustomResourceHook from '../tools/CustomResourceHook';
import CustomStructureHook from '../tools/CustomStructureHook';

function Homes(): JSX.Element {
  const structureData = useBetween(CustomStructureHook);
  const resourceData = useBetween(CustomResourceHook);

  const canUpgrade = () =>
    resourceData.honeycomb >= structureData.costNextLevelHomes;

  const upgrade = () => {
    let canUpgrade = false;
    resourceData.setHoneycomb((previousHoneycomb) => {
      const nextHoneycomb =
        previousHoneycomb - structureData.costNextLevelHomes;
      if (nextHoneycomb < 0) return previousHoneycomb;
      canUpgrade = true;
      return nextHoneycomb;
    });
    if (canUpgrade) {
      structureData.setLevelHomes((previousLevel) => previousLevel + 1);
      structureData.setCostNextLevelHomes(
        (previousCost) => previousCost * staticConstants.STRUCTURE_SCALING.Homes
      );
    }
  };

  return (
    <div id="Homes">
      Homes <br />
      level:{' '}
      <div id="homesLevel" style={{ display: 'inline-block' }}>
        {structureData.levelHomes}
      </div>
      <br />
      cost of next level:{' '}
      <div id="homesNextLevelCost" style={{ display: 'inline-block' }}>
        {structureData.costNextLevelHomes}
      </div>
      <br />
      <div id="upgradeHomesButton">
        <Button onClick={upgrade} disabled={!canUpgrade()} size="small">
          upgrade
        </Button>
      </div>
    </div>
  );
}

export default Homes;

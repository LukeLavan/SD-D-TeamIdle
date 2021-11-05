/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { useBetween } from 'use-between';
import { staticConstants } from '../../constants/constants';
import Button from '../Button/Button';
import CustomResourceHook from '../tools/CustomResourceHook';
import CustomStructureHook from '../tools/CustomStructureHook';

function Factory(): JSX.Element {
  const structureData = useBetween(CustomStructureHook);
  const resourceData = useBetween(CustomResourceHook);

  const canUpgrade = () =>
    resourceData.honeycomb >= structureData.costNextLevelFactory;

  const upgrade = () => {
    let canUpgrade = false;
    resourceData.setHoneycomb((previousHoneycomb) => {
      const nextHoneycomb =
        previousHoneycomb - structureData.costNextLevelFactory;
      if (nextHoneycomb < 0) return previousHoneycomb;
      canUpgrade = true;
      return nextHoneycomb;
    });
    if (canUpgrade) {
      structureData.setLevelFactory((previousLevel) => previousLevel + 1);
      structureData.setCostNextLevelFactory(
        (previousCost) =>
          previousCost * staticConstants.STRUCTURE_SCALING.Factory
      );
    }
  };

  return (
    <div id="Factory">
      Factory <br />
      level:{' '}
      <div id="factoryLevel" style={{ display: 'inline-block' }}>
        {structureData.levelFactory}
      </div>
      <br />
      cost of next level:{' '}
      <div id="factoryNextLevelCost" style={{ display: 'inline-block' }}>
        {structureData.costNextLevelFactory}
      </div>
      <br />
      <div id="upgradeFactoryButton">
        <Button onClick={upgrade} disabled={!canUpgrade()} size="small">
          upgrade
        </Button>
      </div>
    </div>
  );
}

export default Factory;

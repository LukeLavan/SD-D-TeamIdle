/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { useBetween } from 'use-between';
import { staticConstants } from '../../constants/constants';
import Button from '../Button/Button';
import CustomResourceHook from '../tools/CustomResourceHook';
import CustomStructureHook from '../tools/CustomStructureHook';

function Storage(): JSX.Element {
  const structureData = useBetween(CustomStructureHook);
  const resourceData = useBetween(CustomResourceHook);

  const canUpgrade = () =>
    resourceData.honeycomb >= structureData.costNextLevelStorage;

  const upgrade = () => {
    let canUpgrade = false;
    resourceData.setHoneycomb((previousHoneycomb) => {
      const nextHoneycomb =
        previousHoneycomb - structureData.costNextLevelStorage;
      if (nextHoneycomb < 0) return previousHoneycomb;
      canUpgrade = true;
      return nextHoneycomb;
    });
    if (canUpgrade) {
      structureData.setLevelStorage((previousLevel) => previousLevel + 1);
      structureData.setCostNextLevelStorage(
        (previousCost) =>
          previousCost * staticConstants.STRUCTURE_SCALING.Storage
      );
    }
  };

  return (
    <div id="Storage">
      Storage <br />
      level:{' '}
      <div id="storageLevel" style={{ display: 'inline-block' }}>
        {structureData.levelStorage}
      </div>
      <br />
      cost of next level:{' '}
      <div id="storageNextLevelCost" style={{ display: 'inline-block' }}>
        {structureData.costNextLevelStorage}
      </div>
      <br />
      <div id="upgradeStorageButton">
        <Button onClick={upgrade} disabled={!canUpgrade()} size="small">
          upgrade
        </Button>
      </div>
    </div>
  );
}

export default Storage;

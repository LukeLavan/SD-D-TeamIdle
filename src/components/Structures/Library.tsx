/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { useBetween } from 'use-between';
import { staticConstants } from '../../constants/constants';
import Button from '../Button/Button';
import CustomResourceHook from '../tools/CustomResourceHook';
import CustomStructureHook from '../tools/CustomStructureHook';

function Library(): JSX.Element {
  const structureData = useBetween(CustomStructureHook);
  const resourceData = useBetween(CustomResourceHook);

  const canUpgrade = () =>
    resourceData.honeycomb >= structureData.costNextLevelLibrary;

  const upgrade = () => {
    let canUpgrade = false;
    resourceData.setHoneycomb((previousHoneycomb) => {
      const nextHoneycomb =
        previousHoneycomb - structureData.costNextLevelLibrary;
      if (nextHoneycomb < 0) return previousHoneycomb;
      canUpgrade = true;
      return nextHoneycomb;
    });
    if (canUpgrade) {
      structureData.setLevelLibrary((previousLevel) => previousLevel + 1);
      structureData.setCostNextLevelLibrary(
        (previousCost) =>
          previousCost * staticConstants.STRUCTURE_SCALING.Library
      );
    }
  };

  return (
    <div id="Library">
      Library <br />
      level: {structureData.levelLibrary} <br />
      cost of next level: {structureData.costNextLevelLibrary} <br />
      <Button onClick={upgrade} disabled={!canUpgrade()} size="small">
        upgrade
      </Button>
    </div>
  );
}

export default Library;

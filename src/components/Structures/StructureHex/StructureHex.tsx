/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { useBetween } from 'use-between';
import CustomResourceHook from '../../tools/CustomResourceHook';

import Button from '../../Button/Button';

interface Props {
  name: string;
  level: number;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  costNextLevel: number;
  setCostNextLevel: React.Dispatch<React.SetStateAction<number>>;
  costScaling: number;
}

function DanceFloor(props: Props): JSX.Element {
  const resourceData = useBetween(CustomResourceHook);

  const canUpgrade = () => resourceData.honeycomb >= props.costNextLevel;

  const upgrade = () => {
    let canUpgrade = false;
    resourceData.setHoneycomb((previousHoneycomb) => {
      const nextHoneycomb = previousHoneycomb - props.costNextLevel;
      if (nextHoneycomb < 0) return previousHoneycomb;
      canUpgrade = true;
      return nextHoneycomb;
    });
    if (canUpgrade) {
      props.setLevel((previousLevel) => previousLevel + 1);
      props.setCostNextLevel(
        (previousCost) => previousCost * props.costScaling
      );
    }
  };

  return (
    <div id={props.name}>
      {props.name} <br />
      level:{' '}
      <div
        id={props.name.replace(' ', '') + 'Level'}
        style={{ display: 'inline-block' }}
      >
        {props.level}
      </div>
      <br />
      cost of next level:{' '}
      <div
        id={props.name.replace(' ', '') + 'NextLevelCost'}
        style={{ display: 'inline-block' }}
      >
        {props.costNextLevel}
      </div>
      <br />
      <div id={props.name.replace(' ', '') + 'UpgradeButton'}>
        <Button onClick={upgrade} disabled={!canUpgrade()} size="small">
          upgrade
        </Button>
      </div>
    </div>
  );
}

export default DanceFloor;

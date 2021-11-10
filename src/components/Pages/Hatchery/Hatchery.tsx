/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import CustomBeeHook from '../../tools/CustomBeeHook';
import CustomHatcheryHook from '../../tools/CustomHatcheryHook';
import CustomResourceHook from '../../tools/CustomResourceHook';
import CustomStructureHook from '../../tools/CustomStructureHook';
import { useBetween } from 'use-between';

import { staticConstants } from '../../../constants/constants';
import { Hexagon, Honeycomb } from 'react-honeycomb';

import Bees from '../../Bees/bees';
import BroodCell from '../../BroodCell/BroodCell';
import Button from '../../Button/Button';

import './Hatchery.css';

function Hatchery(): JSX.Element {
  const beeData = useBetween(CustomBeeHook);
  const hatcheryData = useBetween(CustomHatcheryHook);
  const resourceData = useBetween(CustomResourceHook);
  const { levelHomes } = useBetween(CustomStructureHook);
  const calcTotalAdults = () => {
    return (
      beeData.bees +
      beeData.idleWorkers +
      beeData.drones +
      beeData.workersAssignedDanceFloor +
      beeData.workersAssignedFactory +
      beeData.workersAssignedHatchery +
      beeData.workersAssignedRefinery
    );
  };
  const ITEMS = ['1', '2', 'BLANK', '3', '4', '5', '6', '7'];
  const renderItem = (item: string): JSX.Element => {
    if (item === 'BLANK') return <>{item}</>;
    const cellNum = parseInt(item);
    return <BroodCell i={cellNum} />;
  };
  return (
    <div>
      <div id="Hatchery_Left">
        <Bees />
      </div>
      <div id="Hatchery_Right">
        <div style={{ visibility: 'hidden' }}>
          <Button
            onClick={() => {
              return;
            }}
          >
            Buzz Buzz Buzz
          </Button>
        </div>
        <Honeycomb
          columns={3}
          size={100}
          items={ITEMS}
          renderItem={(item) => (
            <Hexagon className={item}>
              <div className="backgroundHex">{renderItem(item)}</div>
            </Hexagon>
          )}
        />
      </div>
    </div>
  );
}

export default Hatchery;

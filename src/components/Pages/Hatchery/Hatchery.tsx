/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { Hexagon, Honeycomb } from 'react-honeycomb';

import CustomBeeHook from '../../tools/CustomBeeHook';
import CustomHatcheryHook from '../../tools/CustomHatcheryHook';
import { useBetween } from 'use-between';

import Bees from '../../Bees/bees';
import BroodCell from '../../BroodCell/BroodCell';

import './Hatchery.css';

function Hatchery(): JSX.Element {
  const ITEMS = ['0', '1', 'BLANK', '2', '3', '4', '5', '6'];
  const HatcheryData = useBetween(CustomHatcheryHook);
  const { workersAssignedHatchery } = useBetween(CustomBeeHook);
  const renderItem = (item: string): JSX.Element => {
    if (item === 'BLANK') return <>{item}</>;
    const cellNum = parseInt(item);
    return <BroodCell i={cellNum} />;
  };
  if (HatcheryData.eggReady) {
    // try getting an empty cell
    let nextCell = -1;
    for (
      let i = 0;
      i < HatcheryData.broodcells.length && i < workersAssignedHatchery;
      ++i
    ) {
      if (HatcheryData.broodcells[i].type === 'none') {
        nextCell = i;
        break;
      }
    }
    if (nextCell != -1) {
      // assign egg to cell
      HatcheryData.setBroodcells((previousBroodcells) => {
        const nextBroodcells = previousBroodcells;
        nextBroodcells[nextCell].type = 'egg';
        return nextBroodcells;
      });
      HatcheryData.setEggReady(false);
    }
  }
  return (
    <div>
      <div id="Hatchery_Left">
        <Bees />
      </div>
      <div id="Hatchery_Right">
        <div id="eggtime">
          {!HatcheryData.eggReady ? (
            <> Time to next egg: {HatcheryData.ticksNextEgg} </>
          ) : (
            <> awaiting open cell </>
          )}
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

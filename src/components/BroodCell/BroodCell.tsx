/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import CustomBeeHook from '../tools/CustomBeeHook';
import CustomHatcheryHook from '../tools/CustomHatcheryHook';
import CustomResourceHook from '../tools/CustomResourceHook';
import CustomStructureHook from '../tools/CustomStructureHook';
import { useBetween } from 'use-between';

import { staticConstants } from '../../constants/constants';

import Button from '../Button/Button';
import './BroodCell.css';

interface Props {
  i: number;
}

function BroodCell(props: Props): JSX.Element {
  const { broodcells, setBroodcells } = useBetween(CustomHatcheryHook);
  const { workersAssignedHatchery } = useBetween(CustomBeeHook);
  const { levelHatchery } = useBetween(CustomStructureHook);
  const { royalJelly, setRoyalJelly } = useBetween(CustomResourceHook);

  const i = props.i;
  const cell = broodcells[i];

  const chooseDestiny = (choice: string, cost: number) => {
    setRoyalJelly((previousRoyalJelly) => {
      if (previousRoyalJelly < cost) return previousRoyalJelly;
      setBroodcells((previousBroodcells) => {
        const newBroodcells = [...previousBroodcells];
        newBroodcells[i].type = 'larva';
        newBroodcells[i].destiny = choice;
        newBroodcells[i].ticksLeft = 240;
        return newBroodcells;
      });
      return previousRoyalJelly - cost;
    });
  };
  const chooseDrone = () => chooseDestiny('drone', 0);
  const chooseWorker = () =>
    chooseDestiny('worker', staticConstants.WORKER_COST_ROYAL_JELLY);
  const canChooseWorker = () => {
    return royalJelly >= staticConstants.WORKER_COST_ROYAL_JELLY;
  };

  const destinyComponent = () => {
    if (cell.type === 'egg')
      return (
        <div className="Destiny">
          determine destiny:
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={chooseDrone} size="tiny">
              drone
            </Button>
            <Button
              onClick={chooseWorker}
              disabled={!canChooseWorker()}
              size="tiny"
            >
              worker
            </Button>
          </div>
          {canChooseWorker() ? false : <> workers: 5 royal jelly </>}
        </div>
      );

    return <div className="Destiny">{cell.destiny}</div>;
  };
  const ticksLeftComponent = () => {
    if (cell.ticksLeft === -1) return false;
    if (cell.type === 'adult') return <> awaiting vacancy </>;
    return <> {cell.ticksLeft} </>;
  };

  if (workersAssignedHatchery > i)
    return (
      <div className="BroodCell">
        <b>{cell.type}</b> <br />
        {destinyComponent()}
        {ticksLeftComponent()}
      </div>
    );
  if (broodcells[i].type != 'none')
    setBroodcells((previousBroodcells) => {
      const newBroodcells = [...previousBroodcells];
      newBroodcells[i].type = 'none';
      newBroodcells[i].destiny = 'awaiting egg';
      newBroodcells[i].ticksLeft = -1;
      return newBroodcells;
    });
  return (
    <div className="BroodCell disabled">
      {i >= levelHatchery ? <>upgrade hatchery</> : <>assign nurse</>}
      <br />
      to use this cell
    </div>
  );
}

export default BroodCell;

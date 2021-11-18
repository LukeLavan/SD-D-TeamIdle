/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { Honeycomb, Hexagon } from 'react-honeycomb';
import StructureHex from './StructureHex/StructureHex';
import './structures.css';
import { useBetween } from 'use-between';
import CustomStructureHook from '../tools/CustomStructureHook';
import { staticConstants } from '../../constants/constants';

const ITEMS = [
  'Dance Floor',
  'Refinery',
  'BLANK',
  'Factory',
  'Storage',
  'Homes',
  'Library',
  'Hatchery'
];

function structures(): JSX.Element {
  const StructureData = useBetween(CustomStructureHook);
  const renderItem = (item: string): JSX.Element => {
    switch (item) {
      case 'Dance Floor':
        return (
          <StructureHex
            name={item}
            level={StructureData.levelDanceFloor}
            setLevel={StructureData.setLevelDanceFloor}
            costNextLevel={StructureData.costNextLevelDanceFloor}
            setCostNextLevel={StructureData.setCostNextLevelDanceFloor}
            costScaling={staticConstants.STRUCTURE_SCALING.DanceFloor}
          />
        );
      case 'Refinery':
        return (
          <StructureHex
            name={item}
            level={StructureData.levelRefinery}
            setLevel={StructureData.setLevelRefinery}
            costNextLevel={StructureData.costNextLevelRefinery}
            setCostNextLevel={StructureData.setCostNextLevelRefinery}
            costScaling={staticConstants.STRUCTURE_SCALING.Refinery}
          />
        );
      case 'Factory':
        return (
          <StructureHex
            name={item}
            level={StructureData.levelFactory}
            setLevel={StructureData.setLevelFactory}
            costNextLevel={StructureData.costNextLevelFactory}
            setCostNextLevel={StructureData.setCostNextLevelFactory}
            costScaling={staticConstants.STRUCTURE_SCALING.Factory}
          />
        );
      case 'Storage':
        return (
          <StructureHex
            name={item}
            level={StructureData.levelStorage}
            setLevel={StructureData.setLevelStorage}
            costNextLevel={StructureData.costNextLevelStorage}
            setCostNextLevel={StructureData.setCostNextLevelStorage}
            costScaling={staticConstants.STRUCTURE_SCALING.Storage}
          />
        );
      case 'Homes':
        return (
          <StructureHex
            name={item}
            level={StructureData.levelHomes}
            setLevel={StructureData.setLevelHomes}
            costNextLevel={StructureData.costNextLevelHomes}
            setCostNextLevel={StructureData.setCostNextLevelHomes}
            costScaling={staticConstants.STRUCTURE_SCALING.Homes}
          />
        );
      case 'Hatchery':
        return (
          <StructureHex
            name={item}
            level={StructureData.levelHatchery}
            setLevel={StructureData.setLevelHatchery}
            costNextLevel={StructureData.costNextLevelHatchery}
            setCostNextLevel={StructureData.setCostNextLevelHatchery}
            costScaling={staticConstants.STRUCTURE_SCALING.Hatchery}
          />
        );
      case 'Library':
        return (
          <StructureHex
            name={item}
            level={StructureData.levelLibrary}
            setLevel={StructureData.setLevelLibrary}
            costNextLevel={StructureData.costNextLevelLibrary}
            setCostNextLevel={StructureData.setCostNextLevelLibrary}
            costScaling={staticConstants.STRUCTURE_SCALING.Library}
          />
        );
      default:
        return <>{item}</>;
    }
  };

  return (
    <div className="structures">
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
  );
}

export default structures;

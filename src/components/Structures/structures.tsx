/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { Honeycomb, Hexagon } from 'react-honeycomb';
import StructureHex from './StructureHex/StructureHex';

import CustomStructureHook from '../tools/CustomStructureHook';
import CustomResourceHook from '../tools/CustomResourceHook';
import CustomTechHook from '../tools/CustomTechHook';
import { useBetween } from 'use-between';

import { staticConstants } from '../../constants/constants';

import './structures.css';

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
  const ResourceData = useBetween(CustomResourceHook);
  const { techHoneycombEfficiency } = useBetween(CustomTechHook);

  const upgradeStorage = () => {
    ResourceData.setMaxHoney(
      (previousMax) => previousMax + staticConstants.STORAGE_SCALING.honey
    );
    ResourceData.setMaxNectar(
      (previousMax) => previousMax + staticConstants.STORAGE_SCALING.nectar
    );
    ResourceData.setMaxHoneycomb(
      (previousMax) => previousMax + staticConstants.STORAGE_SCALING.honeycomb
    );
    ResourceData.setMaxRoyalJelly(
      (previousMax) => previousMax + staticConstants.STORAGE_SCALING.royalJelly
    );
  };
  const renderItem = (item: string): JSX.Element => {
    switch (item) {
      case 'Dance Floor':
        return (
          <StructureHex
            name={item}
            level={StructureData.levelDanceFloor}
            setLevel={StructureData.setLevelDanceFloor}
            costNextLevel={
              StructureData.costNextLevelDanceFloor / techHoneycombEfficiency
            }
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
            costNextLevel={
              StructureData.costNextLevelRefinery / techHoneycombEfficiency
            }
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
            costNextLevel={
              StructureData.costNextLevelFactory / techHoneycombEfficiency
            }
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
            costNextLevel={
              StructureData.costNextLevelStorage / techHoneycombEfficiency
            }
            setCostNextLevel={StructureData.setCostNextLevelStorage}
            costScaling={staticConstants.STRUCTURE_SCALING.Storage}
            upgradeCallback={upgradeStorage}
          />
        );
      case 'Homes':
        return (
          <StructureHex
            name={item}
            level={StructureData.levelHomes}
            setLevel={StructureData.setLevelHomes}
            costNextLevel={
              StructureData.costNextLevelHomes / techHoneycombEfficiency
            }
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
            costNextLevel={
              StructureData.costNextLevelHatchery / techHoneycombEfficiency
            }
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
            costNextLevel={
              StructureData.costNextLevelLibrary / techHoneycombEfficiency
            }
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

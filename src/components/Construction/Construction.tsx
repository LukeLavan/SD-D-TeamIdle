/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { useEffect } from 'react';

import Button from '../Button/Button';

import { staticConstants } from '../../constants/constants';

interface Props {
  honeycomb: number;
  setHoneycomb: React.Dispatch<React.SetStateAction<number>>;
  levelDanceFloor: number;
  setLevelDanceFloor: React.Dispatch<React.SetStateAction<number>>;
  canUpgradeDanceFloor: boolean;
  setCanUpgradeDanceFloor: React.Dispatch<React.SetStateAction<boolean>>;
  levelRefinery: number;
  setLevelRefinery: React.Dispatch<React.SetStateAction<number>>;
  canUpgradeRefinery: boolean;
  setCanUpgradeRefinery: React.Dispatch<React.SetStateAction<boolean>>;
  levelHatchery: number;
  setLevelHatchery: React.Dispatch<React.SetStateAction<number>>;
  canUpgradeHatchery: boolean;
  setCanUpgradeHatchery: React.Dispatch<React.SetStateAction<boolean>>;
  levelFactory: number;
  setLevelFactory: React.Dispatch<React.SetStateAction<number>>;
  canUpgradeFactory: boolean;
  setCanUpgradeFactory: React.Dispatch<React.SetStateAction<boolean>>;
}

function Construction(props: Props): JSX.Element {
  const calcCostDanceFloorUpgrade = () =>
    Math.ceil(
      staticConstants.STRUCTURE_COST.DANCEFLOOR.initial *
        props.levelDanceFloor **
          staticConstants.STRUCTURE_COST.DANCEFLOOR.scaling
    );
  const calcCostRefineryUpgrade = () =>
    Math.ceil(
      staticConstants.STRUCTURE_COST.REFINERY.initial *
        props.levelRefinery ** staticConstants.STRUCTURE_COST.REFINERY.scaling
    );
  const calcCostHatcheryUpgrade = () =>
    Math.ceil(
      staticConstants.STRUCTURE_COST.HATCHERY.initial *
        props.levelHatchery ** staticConstants.STRUCTURE_COST.HATCHERY.scaling
    );
  const calcCostFactoryUpgrade = () =>
    Math.ceil(
      staticConstants.STRUCTURE_COST.FACTORY.initial *
        props.levelFactory ** staticConstants.STRUCTURE_COST.FACTORY.scaling
    );

  const calcCanUpgradeDanceFloor = () =>
    props.honeycomb >= calcCostDanceFloorUpgrade();
  useEffect(() => {
    props.setCanUpgradeDanceFloor(calcCanUpgradeDanceFloor());
  }, [props.honeycomb, props.levelDanceFloor]);
  const calcCanUpgradeRefinery = () =>
    props.honeycomb >= calcCostRefineryUpgrade();
  useEffect(() => {
    props.setCanUpgradeRefinery(calcCanUpgradeRefinery());
  }, [props.honeycomb, props.levelRefinery]);
  const calcCanUpgradeHatchery = () =>
    props.honeycomb >= calcCostHatcheryUpgrade();
  useEffect(() => {
    props.setCanUpgradeHatchery(calcCanUpgradeHatchery());
  }, [props.honeycomb, props.levelHatchery]);
  const calcCanUpgradeFactory = () =>
    props.honeycomb >= calcCostFactoryUpgrade();
  useEffect(() => {
    props.setCanUpgradeFactory(calcCanUpgradeFactory());
  }, [props.honeycomb, props.levelFactory]);

  const upgradeDanceFloor = () => {
    const cost = calcCostDanceFloorUpgrade();
    if (calcCanUpgradeDanceFloor()) {
      props.setHoneycomb((previousHoneyComb) => previousHoneyComb - cost);
      props.setLevelDanceFloor((previousLevel) => previousLevel + 1);
    }
  };
  const upgradeRefinery = () => {
    const cost = calcCostRefineryUpgrade();
    if (calcCanUpgradeRefinery()) {
      props.setHoneycomb((previousHoneyComb) => previousHoneyComb - cost);
      props.setLevelRefinery((previousLevel) => previousLevel + 1);
    }
  };
  const upgradeHatchery = () => {
    const cost = calcCostHatcheryUpgrade();
    if (calcCanUpgradeHatchery()) {
      props.setHoneycomb((previousHoneyComb) => previousHoneyComb - cost);
      props.setLevelHatchery((previousLevel) => previousLevel + 1);
    }
  };
  const upgradeFactory = () => {
    const cost = calcCostFactoryUpgrade();
    if (calcCanUpgradeFactory()) {
      props.setHoneycomb((previousHoneyComb) => previousHoneyComb - cost);
      props.setLevelFactory((previousLevel) => previousLevel + 1);
    }
  };

  return (
    <div className="Construction">
      <div className="Construction DanceFloor">
        Dance Floor level: {props.levelDanceFloor} <br />
        <Button onClick={upgradeDanceFloor} disabled={!props.canUpgradeFactory}>
          upgrade Dance Floor
        </Button>
        cost of next upgrade: {calcCostDanceFloorUpgrade()}
      </div>
      <div className="Construction Refinery">
        Refinery level: {props.levelRefinery} <br />
        <Button onClick={upgradeRefinery} disabled={!props.canUpgradeRefinery}>
          upgrade Refinery
        </Button>
        cost of next upgrade: {calcCostRefineryUpgrade()}
      </div>
      <div className="Construction Hatchery">
        Hatchery level: {props.levelHatchery} <br />
        <Button onClick={upgradeHatchery} disabled={!props.canUpgradeHatchery}>
          upgrade Hatchery
        </Button>
        cost of next upgrade: {calcCostHatcheryUpgrade()}
      </div>
      <div className="Construction Factory">
        Factory level: {props.levelFactory} <br />
        <Button onClick={upgradeFactory} disabled={!props.canUpgradeFactory}>
          upgrade Factory
        </Button>
        cost of next upgrade: {calcCostFactoryUpgrade()}
      </div>
    </div>
  );
}

export default Construction;

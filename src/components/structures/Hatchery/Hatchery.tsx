/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { useEffect } from 'react';

import Button from '../../Button/Button';

import { staticConstants } from '../../../constants/constants';

interface Props {
  bees: number;
  setBees: React.Dispatch<React.SetStateAction<number>>;
  canBuyNextBee: boolean;
  setCanBuyNextBee: React.Dispatch<React.SetStateAction<boolean>>;
  costOfNextBeeHoney: number;
  setCostOfNextBeeHoney: React.Dispatch<React.SetStateAction<number>>;
  costOfNextBeeRoyalJelly: number;
  setCostOfNextBeeRoyalJelly: React.Dispatch<React.SetStateAction<number>>;
  royalJelly: number;
  setRoyalJelly: React.Dispatch<React.SetStateAction<number>>;
  honey: number;
  setHoney: React.Dispatch<React.SetStateAction<number>>;
  pupae: number;
  setPupae: React.Dispatch<React.SetStateAction<number>>;
  drones: number;
  setDrones: React.Dispatch<React.SetStateAction<number>>;
  workers: number;
  setWorkers: React.Dispatch<React.SetStateAction<number>>;
  canAssignBee: boolean;
  setCanAssignBee: React.Dispatch<React.SetStateAction<boolean>>;
  larvae: number;
  setLarvae: React.Dispatch<React.SetStateAction<number>>;
  canUpgradePupaeToLarvae: boolean;
  setCanUpgradePupaeToLarvae: React.Dispatch<React.SetStateAction<boolean>>;
  canUpgradeLarvaeToBee: boolean;
  setCanUpgradeLarvaeToBee: React.Dispatch<React.SetStateAction<boolean>>;
}

function Hatchery(props: Props): JSX.Element {
  const buyNextBee = () => {
    if (props.canBuyNextBee) {
      props.setBees((previousBees) => previousBees + 1);
      props.setHoney(
        (previousHoney) => previousHoney - props.costOfNextBeeHoney
      );
      props.setRoyalJelly(
        (previousRoyalJelly) =>
          previousRoyalJelly - props.costOfNextBeeRoyalJelly
      );
    }
  };

  // re-evaluate if we can buy next bee when relevant vars change
  const calcCanBuyNextBee = () => {
    return (
      props.honey >= props.costOfNextBeeHoney &&
      props.royalJelly >= props.costOfNextBeeRoyalJelly
    );
  };
  useEffect(() => {
    props.setCanBuyNextBee(calcCanBuyNextBee());
  }, [props.honey, props.bees, props.royalJelly]);

  // calculate new bee cost when bee count updates
  const calcCostOfNextBee = () => {
    props.setCostOfNextBeeHoney((props.bees + 1) ** 2);
    props.setCostOfNextBeeRoyalJelly(1.3 ** props.bees - 1);
  };
  useEffect(() => {
    calcCostOfNextBee();
  }, [props.bees]);

  const beeToDrone = () => {
    if (props.bees === 0) {
      return;
    }
    props.setBees((previousBees) => previousBees - 1);
    props.setDrones((previousDrone) => previousDrone + 1);
  };

  const beeToWorker = () => {
    if (props.bees === 0) {
      return;
    }
    props.setBees((previousBees) => previousBees - 1);
    props.setWorkers((previousWorker) => previousWorker + 1);
  };

  const calcCanUpgradePupaeToLarvae = () => {
    return (
      props.royalJelly >= staticConstants.PUPAE_TO_LARVAE_COST &&
      props.pupae >= 1.0
    );
  };
  useEffect(() => {
    props.setCanUpgradePupaeToLarvae(calcCanUpgradePupaeToLarvae());
  }, [props.royalJelly, props.pupae, props.larvae]);

  const calcCanUpgradeLarvaeToBee = () => {
    return (
      props.royalJelly >= staticConstants.LARVAE_TO_BEE_COST &&
      props.larvae >= 1.0
    );
  };
  useEffect(() => {
    props.setCanUpgradeLarvaeToBee(calcCanUpgradeLarvaeToBee());
  }, [props.royalJelly, props.larvae, props.bees]);

  const calcCanAssignBee = () => {
    return props.bees === 0;
  };
  useEffect(() => {
    props.setCanAssignBee(calcCanAssignBee);
  }, [props.bees]);

  const upgradePupaeToLarvae = () => {
    if (props.canUpgradePupaeToLarvae) {
      props.setLarvae((previousLarvae) => previousLarvae + 1);
      props.setPupae((previousPupae) => previousPupae - 1);
      props.setRoyalJelly(
        (previousRoyalJelly) =>
          previousRoyalJelly - staticConstants.PUPAE_TO_LARVAE_COST
      );
    }
  };

  const upgradeLarvaeToBee = () => {
    if (props.canUpgradeLarvaeToBee) {
      props.setBees((previousBee) => previousBee + 1);
      props.setLarvae((previousLarvae) => previousLarvae - 1);
      props.setRoyalJelly(
        (previousRoyalJelly) =>
          previousRoyalJelly - staticConstants.LARVAE_TO_BEE_COST
      );
    }
  };

  return (
    <div className="Hatchery">
      bees: {props.bees} <br />
      <Button disabled={!props.canBuyNextBee} onClick={buyNextBee}>
        gain a bee!
      </Button>
      cost of next bee: {props.costOfNextBeeHoney} honey,{' '}
      {props.costOfNextBeeRoyalJelly.toFixed(2)} royal jelly
      <br /> <br />
      <div className="row">
        <div className="column left">
          <Button disabled={props.canAssignBee} onClick={beeToDrone}>
            assign a drone
          </Button>
          drones: {props.drones} <br /> <br />
          pupae: {Math.floor(props.pupae)}
        </div>
        <div className="column right">
          <Button disabled={props.canAssignBee} onClick={beeToWorker}>
            assign a worker
          </Button>
          workers: {props.workers} <br />
        </div>
      </div>
      <br />
      royal jelly: {props.royalJelly.toFixed(2)}
      <br />
      larvae: {props.larvae} <br />
      <Button
        disabled={!props.canUpgradePupaeToLarvae}
        onClick={upgradePupaeToLarvae}
        color="blue"
      >
        upgrade pupae to larvae!
      </Button>
      cost of upgrade: {staticConstants.PUPAE_TO_LARVAE_COST} royal jelly
      <br />
      <br />
      <Button
        disabled={!props.canUpgradeLarvaeToBee}
        onClick={upgradeLarvaeToBee}
        color="green"
      >
        upgrade larvae to bee!
      </Button>
      cost of upgrade: {staticConstants.LARVAE_TO_BEE_COST} royal jelly
      <br />
    </div>
  );
}

export default Hatchery;

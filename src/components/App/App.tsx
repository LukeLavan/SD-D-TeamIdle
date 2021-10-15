/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { usePersistentState } from '../../PersistentState';
import { useState, useEffect } from 'react';
import { variableDefaults, staticConstants } from '../../constants/constants';

import Button from '../Button/Button';

import './App.css';

function App(): JSX.Element {
  // persistent variables
  const [honey, setHoney] = usePersistentState('honey', variableDefaults.honey);
  const [nectar, setNectar] = usePersistentState(
    'nectar',
    variableDefaults.nectar
  );
  const [bees, setBees] = usePersistentState('bees', variableDefaults.bees);
  const [royalJelly, setRoyalJelly] = usePersistentState(
    'royalJelly',
    variableDefaults.royalJelly
  );
  const [honeycomb, setHoneycomb] = usePersistentState(
    'honeycomb',
    variableDefaults.honeycomb
  );
  const [drones, setDrones] = usePersistentState(
    'drones',
    variableDefaults.drones
  );
  const [workers, setWorkers] = usePersistentState(
    'workers',
    variableDefaults.workers
  );
  const [larvae, setLarvae] = usePersistentState(
    'larvae',
    variableDefaults.larvae
  );
  const [pupae, setPupae] = usePersistentState('pupae', variableDefaults.pupae);

  // non-persistent varaibles (can be recalculated on page load)
  const [costOfNextBeeHoney, setCostOfNextBeeHoney] = useState(
    variableDefaults.costOfNextBeeHoney
  );
  const [costOfNextBeeRoyalJelly, setCostOfNextBeeRoyalJelly] = useState(
    variableDefaults.costOfNextBeeRoyalJelly
  );
  const [canBuyNextBee, setCanBuyNextBee] = useState(false);
  const [canBuyHoneycomb, setCanBuyHoneycomb] = useState(false);
  const [canRefineNectar, setCanRefineNectar] = useState(false);
  const [canAssignBee, setCanAssignBee] = useState(false);
  const [canUpgradePupaeToLarvae, setCanUpgradePupaeToLarvae] = useState(false);
  const [canUpgradeLarvaeToBee, setCanUpgradeLarvaeToBee] = useState(false);

  // mutators
  const gatherNectar = () => {
    setNectar(
      (previousNectar) => previousNectar + bees * staticConstants.NECTAR_BY_BEE
    );
  };

  const gatherRoyalJelly = () => {
    setRoyalJelly((previousRoyalJelly) => previousRoyalJelly + 0.27 * bees);
  };

  const createPupae = () => {
    setPupae(
      (previousPupae) => previousPupae + drones * staticConstants.PUPAE_BY_DRONE
    );
  };

  const incrementNectarClicked = () => {
    setNectar((previousNectar) => previousNectar + 1);
  };

  const incrementHoney = () => {
    setHoney((previousHoney) => previousHoney + 1);
  };

  const buyHoneycomb = () => {
    if (canBuyHoneycomb) {
      setHoneycomb((previousHoneycomb) => previousHoneycomb + 1);
      setHoney(
        (previousHoney) =>
          previousHoney - staticConstants.HONEY_TO_HONEYCOMB_COST
      );
    }
  };

  const upgradePupaeToLarvae = () => {
    if (canUpgradePupaeToLarvae) {
      setLarvae((previousLarvae) => previousLarvae + 1);
      setPupae((previousPupae) => previousPupae - 1);
      setRoyalJelly(
        (previousRoyalJelly) =>
          previousRoyalJelly - staticConstants.PUPAE_TO_LARVAE_COST
      );
    }
  };

  const upgradeLarvaeToBee = () => {
    if (canUpgradeLarvaeToBee) {
      setBees((previousBee) => previousBee + 1);
      setLarvae((previousLarvae) => previousLarvae - 1);
      setRoyalJelly(
        (previousRoyalJelly) =>
          previousRoyalJelly - staticConstants.LARVAE_TO_BEE_COST
      );
    }
  };

  const buyNextBee = () => {
    if (canBuyNextBee) {
      setBees((previousBees) => previousBees + 1);
      setHoney((previousHoney) => previousHoney - costOfNextBeeHoney);
      setRoyalJelly(
        (previousRoyalJelly) => previousRoyalJelly - costOfNextBeeRoyalJelly
      );
    }
  };

  const getTotalBees = () => {
    return bees + drones + workers;
  };

  // calculate new bee cost when bee count updates
  const calcCostOfNextBee = () => {
    setCostOfNextBeeHoney((getTotalBees() + 1) ** 2);
    setCostOfNextBeeRoyalJelly(1.3 ** getTotalBees() - 1);
  };
  useEffect(() => {
    calcCostOfNextBee();
  }, [bees]);

  const refineNectar = () => {
    if (canRefineNectar) {
      setNectar(
        (previousNectar) =>
          previousNectar - staticConstants.NECTAR_TO_HONEY_COST
      );
      incrementHoney();
    }
  };
  // re-evaluate if we can refine nectar to honey when relevant vars change
  const calcCanRefineNectar = () => {
    return nectar >= staticConstants.NECTAR_TO_HONEY_COST;
  };
  useEffect(() => {
    setCanRefineNectar(calcCanRefineNectar());
  }, [honey, nectar]);

  // re-evaluate if we can buy next bee when relevant vars change
  const calcCanBuyNextBee = () => {
    return honey >= costOfNextBeeHoney && royalJelly >= costOfNextBeeRoyalJelly;
  };
  useEffect(() => {
    setCanBuyNextBee(calcCanBuyNextBee());
  }, [honey, bees, royalJelly]);

  // re-evaluate if we can buy honeycomb when relevant vars change
  const calcCanBuyHoneycomb = () => {
    return honey >= staticConstants.HONEY_TO_HONEYCOMB_COST;
  };
  useEffect(() => {
    setCanBuyHoneycomb(calcCanBuyHoneycomb());
  }, [honey]);

  const calcCanUpgradePupaeToLarvae = () => {
    return royalJelly >= staticConstants.PUPAE_TO_LARVAE_COST && pupae >= 1.0;
  };
  useEffect(() => {
    setCanUpgradePupaeToLarvae(calcCanUpgradePupaeToLarvae());
  }, [royalJelly, pupae, larvae]);

  const calcCanUpgradeLarvaeToBee = () => {
    return royalJelly >= staticConstants.LARVAE_TO_BEE_COST && larvae >= 1.0;
  };
  useEffect(() => {
    setCanUpgradeLarvaeToBee(calcCanUpgradeLarvaeToBee());
  }, [royalJelly, larvae, bees]);

  // handle the logic for one tick
  const processTick = () => {
    gatherNectar();
    gatherRoyalJelly();
    createPupae();
  };

  const calcCanAssignBee = () => {
    return bees === 0;
  };
  useEffect(() => {
    setCanAssignBee(calcCanAssignBee);
  }, [bees]);

  const beeToDrone = () => {
    if (calcCanAssignBee()) {
      return;
    }
    setBees((previousBees) => previousBees - 1);
    setDrones((previousDrone) => previousDrone + 1);
  };

  const beeToWorker = () => {
    if (calcCanAssignBee()) {
      return;
    }
    setBees((previousBees) => previousBees - 1);
    setWorkers((previousWorker) => previousWorker + 1);
  };
  // process a tick every 1 second
  useEffect(() => {
    const timer = setInterval(processTick, 1000);
    return () => clearInterval(timer);
  }, [bees]); // TODO: come up with a better way to do this

  // reset the state and clear local storage
  const reset = () => {
    setHoney(variableDefaults.honey);
    setBees(variableDefaults.bees);
    setNectar(variableDefaults.nectar);
    setRoyalJelly(variableDefaults.royalJelly);
    setHoneycomb(variableDefaults.honeycomb);
    setDrones(variableDefaults.drones);
    setWorkers(variableDefaults.workers);
    setPupae(variableDefaults.pupae);
    setLarvae(variableDefaults.larvae);
  };

  return (
    <div className="App">
      <h1>bee game</h1>
      <div className="row">
        <div className="column left">
          nectar: {nectar} <br />
          <Button onClick={incrementNectarClicked} color="yellow">
            buzz buzz buzz
          </Button>
          <br />
          <br />
          honey: {honey} <br />
          <Button disabled={!canRefineNectar} onClick={refineNectar}>
            refine that nectar!
          </Button>
          cost of honey: {staticConstants.NECTAR_TO_HONEY_COST} nectar <br />
        </div>
        <div className="column middle">
          bees: {bees} <br />
          <Button disabled={!canBuyNextBee} onClick={buyNextBee}>
            gain a bee!
          </Button>
          cost of next bee: {costOfNextBeeHoney} honey,{' '}
          {costOfNextBeeRoyalJelly.toFixed(2)} royal jelly
          <br /> <br />
          <div className="row">
            <div className="column left">
              <Button disabled={canAssignBee} onClick={beeToDrone}>
                assign a drone
              </Button>
              drones: {drones} <br /> <br />
              pupae: {pupae.toFixed()}
            </div>
            <div className="column right">
              <Button disabled={canAssignBee} onClick={beeToWorker}>
                assign a worker
              </Button>
              workers: {workers} <br />
            </div>
          </div>
          <br /> <br />
          royal jelly: {royalJelly.toFixed(2)}
        </div>
        <div className="column right">
          honeycombs: {honeycomb} <br />
          <Button
            disabled={!canBuyHoneycomb}
            onClick={buyHoneycomb}
            color="yellow"
          >
            make some honeycombs!
          </Button>
          cost of honeycombs: {staticConstants.HONEY_TO_HONEYCOMB_COST} honey
          <br />
          <br />
          larvae: {larvae} <br />
          <Button
            disabled={!canUpgradePupaeToLarvae}
            onClick={upgradePupaeToLarvae}
            color="blue"
          >
            upgrade pupae to larvae!
          </Button>
          cost of upgrade: {staticConstants.PUPAE_TO_LARVAE_COST} royal jelly
          <br />
          <br />
          bees: {bees} <br />
          <Button
            disabled={!canUpgradeLarvaeToBee}
            onClick={upgradeLarvaeToBee}
            color="green"
          >
            upgrade larvae to bee!
          </Button>
          cost of upgrade: {staticConstants.LARVAE_TO_BEE_COST} royal jelly
          <br />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="column left"></div>
        <div className="column middle">
          <Button onClick={reset} color={'red'} size={'small'}>
            reset
          </Button>
        </div>
        <div className="column right"></div>
      </div>
    </div>
  );
}

export default App;

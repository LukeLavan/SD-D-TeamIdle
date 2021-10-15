/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { usePersistentState } from '../../PersistentState';
import { useState, useEffect } from 'react';
import { variableDefaults, staticConstants } from '../../constants/constants';

import Button from '../Button/Button';

import DanceFloor from '../structures/DanceFloor/DanceFloor';
import Refinery from '../structures/Refinery/Refinery';
import Hatchery from '../structures/Hatchery/Hatchery';
import Factory from '../structures/Factory/Factory';
import Construction from '../Construction/Construction';
import Schedule from '../Schedule/Schedule';

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
  const [levelDanceFloor, setLevelDanceFloor] = usePersistentState(
    'levelDanceFloor',
    variableDefaults.structureLevels.DanceFloor
  );
  const [levelRefinery, setLevelRefinery] = usePersistentState(
    'levelRefinery',
    variableDefaults.structureLevels.Refinery
  );
  const [levelHatchery, setLevelHatchery] = usePersistentState(
    'levelHatchery',
    variableDefaults.structureLevels.Hatchery
  );
  const [levelFactory, setLevelFactory] = usePersistentState(
    'levelFactory',
    variableDefaults.structureLevels.Factory
  );
  const [workersAssignedDanceFloor, setWorkersAssignedDanceFloor] =
    usePersistentState(
      'workersAssignedDanceFloor',
      variableDefaults.assignedWorkers.DanceFloor
    );
  const [workersAssignedRefinery, setWorkersAssignedRefinery] =
    usePersistentState(
      'workersAssignedRefinery',
      variableDefaults.assignedWorkers.Refinery
    );
  const [workersAssignedHatchery, setWorkersAssignedHatchery] =
    usePersistentState(
      'workersAssignedHatchery',
      variableDefaults.assignedWorkers.Hatchery
    );
  const [workersAssignedFactory, setWorkersAssignedFactory] =
    usePersistentState(
      'workersAssignedFactory',
      variableDefaults.assignedWorkers.Factory
    );
  const [drones, setDrones] = usePersistentState(
    'drones',
    variableDefaults.bees
  );
  const [workers, setWorkers] = usePersistentState(
    'workers',
    variableDefaults.bees
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
  const [canUpgradeDanceFloor, setCanUpgradeDanceFloor] = useState(false);
  const [canUpgradeRefinery, setCanUpgradeRefinery] = useState(false);
  const [canUpgradeHatchery, setCanUpgradeHatchery] = useState(false);
  const [canUpgradeFactory, setCanUpgradeFactory] = useState(false);
  const [canAssignBee, setCanAssignBee] = useState(false);
  const [canUpgradePupaeToLarvae, setCanUpgradePupaeToLarvae] = useState(false);
  const [canUpgradeLarvaeToBee, setCanUpgradeLarvaeToBee] = useState(false);

  const [restartTimer, setRestartTimer] = useState(false);

  // mutators
  const gatherNectar = () => {
    setNectar(
      (previousNectar) =>
        previousNectar +
        workersAssignedDanceFloor * staticConstants.NECTAR_BY_BEE
    );
  };

  const refineNectar = () => {
    if (canRefineNectar) {
      setNectar(
        (previousNectar) =>
          previousNectar - staticConstants.NECTAR_TO_HONEY_COST
      );
      setHoney((previousHoney) => previousHoney + 1);
    }
  };

  const gatherRoyalJelly = () => {
    setRoyalJelly(
      (previousRoyalJelly) =>
        previousRoyalJelly +
        staticConstants.ROYAL_JELLY_BY_BEE * workersAssignedHatchery
    );
  };

  const createPupae = () => {
    setPupae(
      (previousPupae) => previousPupae + drones * staticConstants.PUPAE_BY_DRONE
    );
  };

  const createHoneycomb = () => {
    if (canBuyHoneycomb) {
      setHoney(
        (previousHoney) =>
          previousHoney - staticConstants.HONEY_TO_HONEYCOMB_COST
      );
      setHoneycomb((previousHoneycomb) => previousHoneycomb + 1);
    }
  };

  const getTotalBees = () =>
    bees +
    drones +
    workers +
    workersAssignedDanceFloor +
    workersAssignedRefinery +
    workersAssignedHatchery +
    workersAssignedFactory;

  // handle the logic for one tick
  const processTick = () => {
    gatherNectar();
    for (let i = 0; i < workersAssignedRefinery; ++i) refineNectar();
    gatherRoyalJelly();
    createPupae();
    for (let i = 0; i < workersAssignedFactory; ++i) createHoneycomb();
    setRestartTimer(true);
  };

  // process a tick every 1 second
  useEffect(() => {
    const timer = setInterval(processTick, 1000);
    return () => {
      clearInterval(timer);
      setRestartTimer(false);
    };
  }, [restartTimer]);

  // reset the state and clear local storage
  const reset = () => {
    setHoney(variableDefaults.honey);
    setBees(variableDefaults.bees);
    setNectar(variableDefaults.nectar);
    setRoyalJelly(variableDefaults.royalJelly);
    setHoneycomb(variableDefaults.honeycomb);
    setLevelDanceFloor(variableDefaults.structureLevels.DanceFloor);
    setLevelRefinery(variableDefaults.structureLevels.Refinery);
    setLevelHatchery(variableDefaults.structureLevels.Hatchery);
    setLevelFactory(variableDefaults.structureLevels.Factory);
    setDrones(variableDefaults.drones);
    setWorkers(variableDefaults.workers);
    setPupae(variableDefaults.pupae);
    setLarvae(variableDefaults.larvae);
    setWorkersAssignedDanceFloor(variableDefaults.assignedWorkers.DanceFloor);
    setWorkersAssignedRefinery(variableDefaults.assignedWorkers.Refinery);
    setWorkersAssignedHatchery(variableDefaults.assignedWorkers.Hatchery);
    setWorkersAssignedFactory(variableDefaults.assignedWorkers.Factory);

    setCostOfNextBeeHoney(variableDefaults.costOfNextBeeHoney);
    setCostOfNextBeeRoyalJelly(variableDefaults.costOfNextBeeRoyalJelly);
  };

  return (
    <div className="App">
      <h1>bee game</h1>
      <div className="row">
        <div className="column left">
          <DanceFloor
            nectar={nectar}
            setNectar={setNectar}
            levelDanceFloor={levelDanceFloor}
            workersAssignedDanceFloor={workersAssignedDanceFloor}
            workersAssignedRefinery={workersAssignedRefinery}
          />
          <br />
          <Refinery
            honey={honey}
            setHoney={setHoney}
            canRefineNectar={canRefineNectar}
            setCanRefineNectar={setCanRefineNectar}
            nectar={nectar}
            setNectar={setNectar}
            workersAssignedRefinery={workersAssignedRefinery}
          />
        </div>
        <div className="column middle">
          <Hatchery
            bees={bees}
            setBees={setBees}
            getTotalBees={getTotalBees}
            canBuyNextBee={canBuyNextBee}
            setCanBuyNextBee={setCanBuyNextBee}
            costOfNextBeeHoney={costOfNextBeeHoney}
            setCostOfNextBeeHoney={setCostOfNextBeeHoney}
            costOfNextBeeRoyalJelly={costOfNextBeeRoyalJelly}
            setCostOfNextBeeRoyalJelly={setCostOfNextBeeRoyalJelly}
            royalJelly={royalJelly}
            setRoyalJelly={setRoyalJelly}
            honey={honey}
            setHoney={setHoney}
            workers={workers}
            setWorkers={setWorkers}
            drones={drones}
            setDrones={setDrones}
            pupae={pupae}
            setPupae={setPupae}
            canAssignBee={canAssignBee}
            setCanAssignBee={setCanAssignBee}
            canUpgradePupaeToLarvae={canUpgradePupaeToLarvae}
            setCanUpgradePupaeToLarvae={setCanUpgradePupaeToLarvae}
            larvae={larvae}
            setLarvae={setLarvae}
            canUpgradeLarvaeToBee={canUpgradeLarvaeToBee}
            setCanUpgradeLarvaeToBee={setCanUpgradeLarvaeToBee}
          />
        </div>
        <div className="column right">
          <Factory
            honeycomb={honeycomb}
            setHoneycomb={setHoneycomb}
            canBuyHoneycomb={canBuyHoneycomb}
            setHoney={setHoney}
            setCanBuyHoneycomb={setCanBuyHoneycomb}
            honey={honey}
          />
          <br />
          <br />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="column left">
          <Construction
            honeycomb={honeycomb}
            setHoneycomb={setHoneycomb}
            levelDanceFloor={levelDanceFloor}
            setLevelDanceFloor={setLevelDanceFloor}
            canUpgradeDanceFloor={canUpgradeDanceFloor}
            setCanUpgradeDanceFloor={setCanUpgradeDanceFloor}
            levelRefinery={levelRefinery}
            setLevelRefinery={setLevelRefinery}
            canUpgradeRefinery={canUpgradeRefinery}
            setCanUpgradeRefinery={setCanUpgradeRefinery}
            levelHatchery={levelHatchery}
            setLevelHatchery={setLevelHatchery}
            canUpgradeHatchery={canUpgradeHatchery}
            setCanUpgradeHatchery={setCanUpgradeHatchery}
            levelFactory={levelFactory}
            setLevelFactory={setLevelFactory}
            canUpgradeFactory={canUpgradeFactory}
            setCanUpgradeFactory={setCanUpgradeFactory}
          />
        </div>
        <div className="column middle">
          <br /> <br /> <br />
          <Button onClick={reset} color={'red'} size={'small'}>
            reset
          </Button>
        </div>
        <div className="column right">
          <Schedule
            workers={workers}
            setWorkers={setWorkers}
            workersAssignedDanceFloor={workersAssignedDanceFloor}
            setWorkersAssignedDanceFloor={setWorkersAssignedDanceFloor}
            workersAssignedRefinery={workersAssignedRefinery}
            setWorkersAssignedRefinery={setWorkersAssignedRefinery}
            workersAssignedHatchery={workersAssignedHatchery}
            setWorkersAssignedHatchery={setWorkersAssignedHatchery}
            workersAssignedFactory={workersAssignedFactory}
            setWorkersAssignedFactory={setWorkersAssignedFactory}
            levelDanceFloor={levelDanceFloor}
            levelRefinery={levelRefinery}
            levelHatchery={levelHatchery}
            levelFactory={levelFactory}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

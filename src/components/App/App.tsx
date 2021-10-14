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

  // mutators
  const gatherNectar = () => {
    setNectar(
      (previousNectar) => previousNectar + bees * staticConstants.NECTAR_BY_BEE
    );
  };

  const gatherRoyalJelly = () => {
    setRoyalJelly(
      (previousRoyalJelly) =>
        previousRoyalJelly + staticConstants.ROYAL_JELLY_BY_BEE * bees
    );
  };

  // handle the logic for one tick
  const processTick = () => {
    gatherNectar();
    gatherRoyalJelly();
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
    setLevelDanceFloor(variableDefaults.structureLevels.DanceFloor);
    setLevelRefinery(variableDefaults.structureLevels.Refinery);
    setLevelHatchery(variableDefaults.structureLevels.Hatchery);
    setLevelFactory(variableDefaults.structureLevels.Factory);
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
          />
          <br />
          <Refinery
            honey={honey}
            setHoney={setHoney}
            canRefineNectar={canRefineNectar}
            setCanRefineNectar={setCanRefineNectar}
            nectar={nectar}
            setNectar={setNectar}
          />
        </div>
        <div className="column middle">
          <Hatchery
            bees={bees}
            canBuyNextBee={canBuyNextBee}
            setCanBuyNextBee={setCanBuyNextBee}
            costOfNextBeeHoney={costOfNextBeeHoney}
            setCostOfNextBeeHoney={setCostOfNextBeeHoney}
            costOfNextBeeRoyalJelly={costOfNextBeeRoyalJelly}
            setCostOfNextBeeRoyalJelly={setCostOfNextBeeRoyalJelly}
            royalJelly={royalJelly}
            setRoyalJelly={setRoyalJelly}
            setBees={setBees}
            honey={honey}
            setHoney={setHoney}
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

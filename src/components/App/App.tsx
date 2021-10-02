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

  // mutators
  const gatherNectar = () => {
    setNectar(
      (previousNectar) => previousNectar + bees * staticConstants.NECTAR_BY_BEE
    );
  };

  const gatherRoyalJelly = () => {
    setRoyalJelly((previousRoyalJelly) => previousRoyalJelly + 0.27 * bees);
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

  const buyNextBee = () => {
    if (canBuyNextBee) {
      setBees((previousBees) => previousBees + 1);
      setHoney((previousHoney) => previousHoney - costOfNextBeeHoney);
      setRoyalJelly(
        (previousRoyalJelly) => previousRoyalJelly - costOfNextBeeRoyalJelly
      );
    }
  };

  // calculate new bee cost when bee count updates
  const calcCostOfNextBee = () => {
    setCostOfNextBeeHoney((bees + 1) ** 2);
    setCostOfNextBeeRoyalJelly(1.3 ** bees - 1);
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
          <br /> <br /> <br />
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

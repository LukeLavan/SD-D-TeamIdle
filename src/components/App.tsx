/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { usePersistentState } from '../PersistentState';
import { useState, useEffect } from 'react';
import { variableDefaults, staticConstants } from '../constants/constants';
import '../App.css';

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

  // non-persistent varaibles (can be recalculated on page load)
  const [costOfNextBeeHoney, setCostOfNextBeeHoney] = useState(
    variableDefaults.costOfNextBeeHoney
  );
  const [costOfNextBeeRoyalJelly, setCostOfNextBeeRoyalJelly] = useState(
    variableDefaults.costOfNextBeeRoyalJelly
  );
  const [canBuyNextBee, setCanBuyNextBee] = useState(false);

  const honeyCost = staticConstants.NECTAR_TO_HONEY_COST;

  // mutators
  const gatherNectar = () => {
    setNectar(
      (previousNectar) => previousNectar + bees * staticConstants.NECTAR_BY_BEE
    );
  };

  const incrementNectarClicked = () => {
    setNectar((previousNectar) => previousNectar + 1);
  };

  const incrementHoney = () => {
    setHoney((previousHoney) => previousHoney + 1);
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

  const refineNectar = () => {
    if (nectar >= honeyCost) {
      setNectar((previousNectar) => previousNectar - honeyCost);
      incrementHoney();
    }
  };

  const calcCostOfNextBee = () => {
    setCostOfNextBeeHoney((bees + 1) ** 2);
    setCostOfNextBeeRoyalJelly(1.3 ** bees - 1);
  };

  // calculate new bee cost when bee count updates
  useEffect(() => {
    calcCostOfNextBee();
  }, [bees]);

  // re-evaluate if we can buy next bee when relevant vars change
  const calcCanBuyNextBee = () => {
    return honey >= costOfNextBeeHoney && royalJelly >= costOfNextBeeRoyalJelly;
  };
  useEffect(() => {
    setCanBuyNextBee(calcCanBuyNextBee());
    console.log(canBuyNextBee);
  }, [honey, bees, royalJelly]);

  // handle the logic for one tick
  const processTick = () => {
    gatherNectar();
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
  };

  return (
    <div className="App">
      <h1>bee game</h1>
      <p>
        nectar: {nectar} <br />
        <button onClick={incrementNectarClicked}>buzz buzz buzz</button>
      </p>
      <p>
        honey: {honey} <br />
        <button disabled={nectar < honeyCost} onClick={refineNectar}>
          Refine that nectar!
        </button>
        <br />
        cost of honey: {honeyCost} <br />
      </p>
      <p>
        Royal Jelly: {royalJelly.toFixed(2)} <br />
      </p>
      <p>
        bees: {bees} <br />
        <button disabled={!canBuyNextBee} onClick={buyNextBee}>
          gain a bee!
        </button>
        <br />
        cost of next bee: {costOfNextBeeHoney} honey,{' '}
        {costOfNextBeeRoyalJelly.toFixed(2)} jelly
        <br />
      </p>
      <p>
        <button onClick={reset}>reset</button>
      </p>
    </div>
  );
}

export default App;

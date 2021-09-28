/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { usePersistentState } from './PersistentState';
import { useState, useEffect } from 'react';
import './App.css';

// truncate number to n decimal places
const trunc = (numberToTruncate: number, numberOfDecimalPlaces: number) => {
  const tenexp = 10 ** numberOfDecimalPlaces;
  return Math.trunc(numberToTruncate * tenexp) / tenexp;
};

function App(): JSX.Element {
  const variableDefaults = {
    honey: 0,
    bees: 0,
    royalJelly: 0,
    costOfNextBeeHoney: 1,
    costOfNextBeeRoyalJelly: 0
  };

  // persistent variables
  const [honey, setHoney] = usePersistentState('honey', variableDefaults.honey);
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

  // mutators
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
    setHoney((previousHoney) => previousHoney + bees);
    setRoyalJelly((previousRoyalJelly) => previousRoyalJelly + 0.27 * bees);
  };

  // process a tick every 1 second
  useEffect(() => {
    const timer = setInterval(processTick, 1000);
    return () => clearInterval(timer);
  }, []);

  // reset the state and clear local storage
  const reset = () => {
    setHoney(variableDefaults.honey);
    setBees(variableDefaults.bees);
    setRoyalJelly(variableDefaults.royalJelly);
  };

  return (
    <div className="App">
      <h1>bee game</h1>
      <p>
        Honey: {honey} <br />
        <button onClick={incrementHoney}>buzz buzz buzz</button>
      </p>
      <p>
        Royal Jelly: {trunc(royalJelly, 2)} <br />
      </p>
      <p>
        bees: {bees} <br />
        <button disabled={!canBuyNextBee} onClick={buyNextBee}>
          gain a bee!
        </button>
        <br />
        cost of next bee: {costOfNextBeeHoney} honey,{' '}
        {trunc(costOfNextBeeRoyalJelly, 2)} jelly
        <br />
      </p>
      <p>
        <button onClick={reset}>reset</button>
      </p>
    </div>
  );
}

export default App;

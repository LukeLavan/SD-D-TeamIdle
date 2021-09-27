/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { usePersistentState } from './PersistentState';
import { useState, useEffect } from 'react';
import './App.css';

function App(): JSX.Element {
  const variableDefaults = {
    honey: 0,
    bees: 0,
    costOfNextBee: 1
  };

  // persistent variables
  const [honey, setHoney] = usePersistentState('honey', variableDefaults.honey);
  const [bees, setBees] = usePersistentState('bees', variableDefaults.bees);

  // non-persistent varaibles (can be recalculated on page load)
  const [costOfNextBee, setCostOfNextBee] = useState(
    variableDefaults.costOfNextBee
  );

  // mutators
  const incrementHoney = () => {
    setHoney((previousHoney) => previousHoney + 1);
  };

  const incrementBees = () => {
    if (honey >= costOfNextBee) {
      setBees((previousBees) => previousBees + 1);
      setHoney((previousHoney) => previousHoney - costOfNextBee);
    }
  };

  const calcCostOfNextBee = () => {
    setCostOfNextBee((bees + 1) ** 2);
  };

  // calculate new bee cost when bee count updates
  useEffect(() => {
    calcCostOfNextBee();
  }, [bees]);

  // handle the logic for one tick
  const processTick = () => {
    setHoney((previousHoney) => previousHoney + bees);
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
  };

  return (
    <div className="App">
      <h1>bee game</h1>
      <p>
        Honey: {honey} <br />
        <button onClick={incrementHoney}>buzz buzz buzz</button>
      </p>
      <p>
        bees: {bees} <br />
        <button disabled={honey < costOfNextBee} onClick={incrementBees}>
          gain a bee!
        </button>
        <br />
        cost of next bee: {costOfNextBee} <br />
      </p>
      <p>
        <button onClick={reset}>reset</button>
      </p>
    </div>
  );
}

export default App;

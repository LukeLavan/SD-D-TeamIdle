/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { usePersistentState } from '../PersistentState';
import { useState, useEffect } from 'react';
import { variableDefaults, NECTAR_BY_BEE } from '../game_mechanics/constants';
import '../App.css';

function App(): JSX.Element {
  // persistent variables
  const [honey, setHoney] = usePersistentState('honey', variableDefaults.honey);
  const [nectar, setNectar] = usePersistentState(
    'nectar',
    variableDefaults.nectar
  );
  const [bees, setBees] = usePersistentState('bees', variableDefaults.bees);

  // non-persistent varaibles (can be recalculated on page load)
  const [costOfNextBee, setCostOfNextBee] = useState(
    variableDefaults.costOfNextBee
  );

  // mutators
  const incrementNectar = () => {
    setNectar(nectar + bees * NECTAR_BY_BEE);
  };

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
<<<<<<< HEAD:src/react_apps/App.tsx
    incrementNectar();
    setHoney(honey + bees);
=======
    setHoney((previousHoney) => previousHoney + bees);
>>>>>>> main:src/App.tsx
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
  };

  return (
    <div className="App">
      <h1>bee game</h1>
      <p>
        honey: {honey} <br />
        <button onClick={incrementHoney}>buzz buzz buzz</button>
      </p>
      <p>
        nectar: {nectar} <br />
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

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

  // non-persistent varaibles (can be recalculated on page load)
  const [costOfNextBee, setCostOfNextBee] = useState(
    variableDefaults.costOfNextBee
  );

  const honeyCost = staticConstants.NECTAR_TO_HONEY_COST;

  // mutators
  const incrementNectar = () => {
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

  const incrementBees = () => {
    if (honey >= costOfNextBee) {
      setBees((previousBees) => previousBees + 1);
      setHoney((previousHoney) => previousHoney - costOfNextBee);
    }
  };

  const refineNectar = () => {
    if (nectar >= honeyCost) {
      setNectar((previousNectar) => previousNectar - honeyCost);
      incrementHoney();
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
    incrementNectar();
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
        bees: {bees} <br />
        <button disabled={honey < costOfNextBee} onClick={incrementBees}>
          Gain a bee!
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

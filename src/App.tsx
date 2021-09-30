/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { usePersistentState } from './PersistentState';
import { useState, useEffect } from 'react';
import './App.css';
import Button from './Button';
import './Button.css';

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
  }, [bees]); // TODO: come up with a better way to do this

  // reset the state and clear local storage
  const reset = () => {
    setHoney(variableDefaults.honey);
    setBees(variableDefaults.bees);
  };

  return (
    <div className="App">
      <div className="row">
        <h1>Bee Game</h1>
        <div className="column left">
          <p> Honey: {honey} </p>
          <Button
            textToDisplay="buzz buzz buzz"
            clickFunction={incrementHoney}
          />
          <p> </p>
        </div>
        <div className="column middle">
          <p> </p>
          <Button textToDisplay="reset" clickFunction={reset} />
          <p> </p>
        </div>
        <div className="column right">
          <p> bees: {bees} </p>
          <Button
            textToDisplay="gain a bee!"
            clickFunction={incrementBees}
            disabledFunction={() => honey < costOfNextBee}
          />
          <p> cost of next bee: {costOfNextBee} </p>
        </div>
      </div>
    </div>
  );
}

export default App;

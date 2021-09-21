import { useState, useEffect } from 'react';
import './App.css';

function App(): JSX.Element {
  const [honey, setHoney] = useState(0);
  const [bees, setBees] = useState(0);
  const [costOfNextBee, setCostOfNextBee] = useState(1);

  const incrementHoney = () => {
    setHoney(honey + 1);
  };

  const incrementBees = () => {
    if (honey >= costOfNextBee) {
      setBees(bees + 1);
      setHoney(honey - costOfNextBee);
    }
  };

  // calculate new bee cost when bee count updates
  useEffect(() => {
    calcCostOfNextBee();
  }, [bees]);

  const calcCostOfNextBee = () => {
    console.log('current bee count: ' + bees);
    setCostOfNextBee((bees + 1) ** 2);
  };

  const processTick = () => {
    setHoney(honey + bees);
  };

  useEffect(() => {
    const timer = setInterval(processTick, 1000);
    return () => clearInterval(timer);
  });

  return (
    <div className="App">
      <h1>bee game</h1>
      <p>
        Honey: {honey} <br />
        <button onClick={incrementHoney}>buzz buzz buzz</button>
      </p>
      <p>
        bees: {bees} <br />
        <button onClick={incrementBees}>gain a bee!</button> <br />
        cost of next bee: {costOfNextBee} <br />
      </p>
    </div>
  );
}

export default App;

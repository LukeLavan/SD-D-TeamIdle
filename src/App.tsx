import { useState, useEffect } from 'react';
import './App.css';

function App(): JSX.Element {
  const [honey, setHoney] = useState(0);

  const increment = () => {
    setHoney(honey + 1);
  };

  useEffect(() => {
    console.log('hello world');
  }, []);

  return (
    <div className="App">
      <h1>bee game</h1>
      {honey} <br />
      <button onClick={increment}>buzz buzz buzz</button>
    </div>
  );
}

export default App;

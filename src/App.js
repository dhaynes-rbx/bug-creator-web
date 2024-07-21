import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [bugs, setBugs] = useState(0);
  const [bps, setBps] = useState(0);
  const [upgrades, setUpgrades] = useState([
    { name: 'Pull Request', cost: 15, cps: 0.1, owned: 0 },
    { name: 'Push to Master', cost: 100, cps: 1, owned: 0 },
    { name: 'Zoom Call with Josh', cost: 1100, cps: 10, owned: 0 },
    { name: 'Merge Conflict', cost: 12000, cps: 100, owned: 0 },
    { name: 'Code Review', cost: 130000, cps: 1000, owned: 0 },
    { name: 'Bug Bash', cost: 1400000, cps: 10000, owned: 0 },
    { name: 'Hackathon', cost: 20000000, cps: 100000, owned: 0},
    { name: 'Assign to Dustin', cost: 330000000, cps: 1000000, owned: 0},
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setBugs(prevCookies => prevCookies + bps);
    }, 1000);

    return () => clearInterval(timer);
  }, [bps]);

  const clickBug = () => {
    setBugs(prevCookies => prevCookies + 1);
  };

  const buyUpgrade = (index) => {
    const upgrade = upgrades[index];
    if (bugs >= upgrade.cost) {
      setBugs(prevCookies => prevCookies - upgrade.cost);
      setBps(prevCps => prevCps + upgrade.cps);
      setUpgrades(prevUpgrades => {
        const newUpgrades = [...prevUpgrades];
        newUpgrades[index] = {
          ...upgrade,
          owned: upgrade.owned + 1,
          cost: Math.ceil(upgrade.cost * 1.15),
        };
        return newUpgrades;
      });
    }
  };

  return (
    <div className="App">
      <h1>Cookie Clicker</h1>
      <div className="bug-container">
        <button className="bug" onClick={clickBug}>🪳</button>
      </div>
      <p>Bugs: {Math.floor(bugs)}</p>
      <p>Bugs per second: {bps.toFixed(1)}</p>
      <div className="upgrades">
        <h2>Upgrades</h2>
        {upgrades.map((upgrade, index) => (
          <button
            key={upgrade.name}
            onClick={() => buyUpgrade(index)}
            disabled={bugs < upgrade.cost}
          >
            Buy {upgrade.name} (Owned: {upgrade.owned})
            <br />
            Cost: {upgrade.cost} bugs
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
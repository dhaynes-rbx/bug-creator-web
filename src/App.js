import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [bugs, setBugs] = useState(0);
  const [bps, setBps] = useState(0);
  const [upgrades, setUpgrades] = useState([
    { name: 'Pull Request', cost: 15, bps: 0.4, owned: 0 },
    { name: 'Push to Master', cost: 50, bps: 4, owned: 0 },
    { name: 'Zoom Call with Josh', cost: 500, bps: 40, owned: 0 },
    { name: 'Merge Conflict', cost: 6000, bps: 400, owned: 0 },
    { name: 'Code Review', cost: 70000, bps: 4000, owned: 0 },
    { name: 'Bug Bash', cost: 700000, bps: 40000, owned: 0 },
    { name: 'Hackathon', cost: 10000000, bps: 400000, owned: 0},
    { name: 'Assign to Dustin', cost: 150000000, bps: 4000000, owned: 0},
    { name: 'Get a Promotion', cost: 2500000000, bps: 40000000, owned: 0},
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setBugs(prevCookies => prevCookies + bps);
    }, 1000);

    return () => clearInterval(timer);
  }, [bps]);

  // ... other state variables ...
  const [isAnimating, setIsAnimating] = useState(false);

  const clickBug = () => {
    setBugs(prevBugs => prevBugs + 1);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 100); // Reset after animation duration
  };

  const buyUpgrade = (index, multiplier) => {
    //if multiplier is not passed, set it to 1
    multiplier = multiplier || 1;

    const upgrade = upgrades[index];
    if (bugs >= upgrade.cost) {
      setBugs(prevBug => prevBug - upgrade.cost);
      setBps(prevBps => prevBps + upgrade.bps);
      setUpgrades(prevUpgrades => {
        const newUpgrades = [...prevUpgrades];
        newUpgrades[index] = {
          ...upgrade,
          owned: upgrade.owned + 1 * multiplier,
          cost: Math.ceil(upgrade.cost * 1.075 * multiplier),
        };
        return newUpgrades;
      });
    }
  };

  const isUpgradeVisible = (index) => {
    if (index === 0) return true;
    return upgrades[index - 1].owned > 0;
  };

  return (
    <div className="App">
      <h1>Bug Clicker</h1>
      
      <div className="bug-container">
        <button 
          className={`bug ${isAnimating ? 'animate' : ''}`} 
          onClick={clickBug}
        >
          🪳
        </button>
      </div>
      <p>Bugs: {Math.floor(bugs)}</p>
      <p>Bugs per second: {bps.toFixed(1)}</p>
      <div className="upgrades">
        <h2>Upgrades</h2>
        {upgrades.map((upgrade, index) => (
          isUpgradeVisible(index) && (
            <div key={upgrade.name} className="upgrade-row">
              <button
                key={upgrade.name}
                onClick={() => buyUpgrade(index)}
                disabled={bugs < upgrade.cost}
              >
                {upgrade.name} (Owned: {upgrade.owned})
                <br />
                Cost: {upgrade.cost} bugs
              </button>
              <button
                key={upgrade.name}
                onClick={() => buyUpgrade(index, 10)}
                disabled={bugs < upgrade.cost * 10}
              >
                Buy 10
              </button>
              <button
                key={upgrade.name}
                onClick={() => buyUpgrade(index, 100)}
                disabled={bugs < upgrade.cost * 100}
              >
                Buy 100
              </button>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default App;
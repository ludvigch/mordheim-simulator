import { useState } from "react";
import { rollD6 } from './lib/util.jsx';

export default function App() {
  const [attackerWS, setAttackerWS] = useState(4);
  const [defenderWS, setDefenderWS] = useState(3);
  const [attackerS, setAttackerS] = useState(4);
  const [defenderT, setDefenderT] = useState(3);
  const [result, setResult] = useState(null);
  const toHit = [
    [4, 4, 5, 5, 5, 5, 5, 5, 5, 5],
    [3, 4, 4, 4, 5, 5, 5, 5, 5, 5],
    [3, 3, 4, 4, 4, 4, 5, 5, 5, 5],
    [3, 3, 3, 4, 4, 4, 4, 4, 5, 5],
    [3, 3, 3, 3, 4, 4, 4, 4, 4, 4],
    [3, 3, 3, 3, 3, 4, 4, 4, 4, 4],
    [3, 3, 3, 3, 3, 3, 4, 4, 4, 4],
    [3, 3, 3, 3, 3, 3, 3, 4, 4, 4],
    [3, 3, 3, 3, 3, 3, 3, 3, 4, 4],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 4]
  ]

  const toWound = [ // rollD6 always <= 6 -> 7 is infinity
    [4, 5, 6, 6, 7, 7, 7, 7, 7, 7],
    [3, 4, 5, 6, 6, 7, 7, 7, 7, 7],
    [2, 3, 4, 5, 6, 6, 7, 7, 7, 7],
    [2, 2, 3, 4, 5, 6, 6, 7, 7, 7],
    [2, 2, 2, 3, 4, 5, 6, 6, 7, 7],
    [2, 2, 2, 2, 3, 4, 5, 6, 6, 7],
    [2, 2, 2, 2, 2, 3, 4, 5, 6, 6],
    [2, 2, 2, 2, 2, 2, 3, 4, 5, 6],
    [2, 2, 2, 2, 2, 2, 2, 3, 4, 5],
    [2, 2, 2, 2, 2, 2, 2, 2, 3, 4]
  ]

  function simulateChargeKill(attackerWS, attackerS, defenderWS, defenderT) {
    let hitRoll = rollD6();
    if(hitRoll >= toHit[attackerWS-1][defenderWS-1]){
      let woundRoll = rollD6();
      if(woundRoll >= toWound[attackerS-1][defenderT-1]){
        let deathRoll = rollD6();
        if(deathRoll >= 5){
          return 1;
        }
      }
    }
    return 0;
  }

  function simulateBattle(trials, attackerWS, attackerS, defenderWS, defenderT) {
    let wins = 0;
    for (let i = 0; i < trials; i++) {
      wins += simulateChargeKill(attackerWS, attackerS, defenderWS, defenderT);
    }
    return wins / trials;
  }

  function runSimulation() {
    const winRate = simulateBattle(10000, attackerWS, attackerS, defenderWS, defenderT);
    setResult(winRate);
  }

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Mordheim Simulator</h1>
      <div className="mb-2">
        <label className="mr-2">Attacker WS:</label>
        <input
          type="number"
          value={attackerWS}
          onChange={(e) => setAttackerWS(Number(e.target.value))}
          className="border rounded px-2"
        />
        <label className="mr-2">Attacker S:</label>
        <input
          type="number"
          value={attackerS}
          onChange={(e) => setAttackerS(Number(e.target.value))}
          className="border rounded px-2"
        />
      </div>
      <div className="mb-4">
        <label className="mr-2">Defender WS:</label>
        <input
          type="number"
          value={defenderWS}
          onChange={(e) => setDefenderWS(Number(e.target.value))}
          className="border rounded px-2"
        />
        <label className="mr-2">Defender T:</label>
        <input
          type="number"
          value={defenderT}
          onChange={(e) => setDefenderT(Number(e.target.value))}
          className="border rounded px-2"
        />
      </div>
      <button onClick={runSimulation} className="bg-blue-500 text-white px-4 py-2 rounded">
        Run Simulation
      </button>
      {result !== null && (
        <div className="mt-4">Charge kill rate: {(result * 100).toFixed(2)}%</div>
      )}
    </div>
  );
}
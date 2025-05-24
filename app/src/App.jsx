import { useState } from "react";

export default function App() {
  const [attacker, setAttacker] = useState(4);
  const [defender, setDefender] = useState(3);
  const [result, setResult] = useState(null);

  function simulateBattle(trials, attacker, defender) {
    let wins = 0;
    for (let i = 0; i < trials; i++) {
      const atkRoll = Math.floor(Math.random() * attacker);
      const defRoll = Math.floor(Math.random() * defender);
      if (atkRoll > defRoll) wins++;
    }
    return wins / trials;
  }

  function runSimulation() {
    const winRate = simulateBattle(10000, attacker, defender);
    setResult(winRate);
  }

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Mordheim Simulator</h1>
      <div className="mb-2">
        <label className="mr-2">Attacker Skill:</label>
        <input
          type="number"
          value={attacker}
          onChange={(e) => setAttacker(Number(e.target.value))}
          className="border rounded px-2"
        />
      </div>
      <div className="mb-4">
        <label className="mr-2">Defender Skill:</label>
        <input
          type="number"
          value={defender}
          onChange={(e) => setDefender(Number(e.target.value))}
          className="border rounded px-2"
        />
      </div>
      <button onClick={runSimulation} className="bg-blue-500 text-white px-4 py-2 rounded">
        Run Simulation
      </button>
      {result !== null && (
        <div className="mt-4">Win rate: {(result * 100).toFixed(2)}%</div>
      )}
    </div>
  );
}
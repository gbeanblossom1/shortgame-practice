import React, { useMemo, useState } from "react";
import { generateRound } from "./roundGenerator";
import {
  calcStrokesGainedHoled,
  calcStrokesGainedOffGreen,
  calcStrokesGainedOnGreen
} from "./sgUtils";

export default function App() {
  const [round, setRound] = useState(null);
  const [current, setCurrent] = useState(0);
  const [leave, setLeave] = useState("");
  const [isOffGreen, setIsOffGreen] = useState(false);
  const [offGreenLie, setOffGreenLie] = useState("rough");
  const [offGreenYards, setOffGreenYards] = useState("");
  const [totalSG, setTotalSG] = useState(0);
  const [results, setResults] = useState([]);

  function startRound() {
    setRound(generateRound());
    setCurrent(0);
    setLeave("");
    setIsOffGreen(false);
    setOffGreenLie("rough");
    setOffGreenYards("");
    setTotalSG(0);
    setResults([]);
  }

  function resetInputs() {
    setLeave("");
    setIsOffGreen(false);
    setOffGreenLie("rough");
    setOffGreenYards("");
  }

  function submitShot() {
    if (!round) return;
    const hole = round[current];

    let sg = 0;
    let resultLabel = "";

    if (isOffGreen) {
      const nextYards = Number(offGreenYards);
      if (!nextYards || nextYards <= 0) {
        alert("Enter the remaining off-green distance in yards.");
        return;
      }

      sg = calcStrokesGainedOffGreen(
        hole.lie,
        hole.yards,
        offGreenLie,
        nextYards
      );
      resultLabel = `Off green: ${offGreenLie}, ${nextYards} yds`;
    } else {
      const leaveFt = Number(leave);

      if (leave === "" || Number.isNaN(leaveFt) || leaveFt < 0) {
        alert("Enter leave distance in feet, or use Off Green.");
        return;
      }

      if (leaveFt === 0) {
        sg = calcStrokesGainedHoled(hole.lie, hole.yards);
        resultLabel = "Holed";
      } else {
        sg = calcStrokesGainedOnGreen(hole.lie, hole.yards, leaveFt);
        resultLabel = `${leaveFt} ft`;
      }
    }

    const updatedTotal = totalSG + sg;
    const shotResult = {
      hole: current + 1,
      lie: hole.lie,
      yards: hole.yards,
      result: resultLabel,
      sg
    };

    setResults((prev) => [...prev, shotResult]);
    setTotalSG(updatedTotal);
    resetInputs();

    if (current < 17) {
      setCurrent((prev) => prev + 1);
    } else {
      alert(`Round complete. Total SG: ${updatedTotal.toFixed(2)}`);
      setRound(null);
    }
  }

  const currentHole = useMemo(() => {
    if (!round) return null;
    return round[current];
  }, [round, current]);

  if (!round) {
    return (
      <div className="container">
        <h1>Short Game Practice</h1>
        <p className="subtle">Benchmark: PGA Tour style public baseline</p>
        <button onClick={startRound}>Start 18 Hole Round</button>

        {results.length > 0 && (
          <div className="summary-card">
            <h3>Last Round</h3>
            <p>Total SG: {totalSG.toFixed(2)}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div className="row-between">
          <h2>Hole {current + 1}</h2>
          <span className="pill">PGA Tour</span>
        </div>

        <p className="shot-label">
          {currentHole.lie} • {currentHole.yards} yards
        </p>

        <label className="label">Leave distance (feet)</label>
        <input
          type="number"
          min="0"
          step="0.1"
          placeholder="0 = holed"
          value={leave}
          onChange={(e) => setLeave(e.target.value)}
          disabled={isOffGreen}
        />

        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={isOffGreen}
            onChange={(e) => setIsOffGreen(e.target.checked)}
          />
          <span>Shot finished off the green</span>
        </label>

        {isOffGreen && (
          <div className="offgreen-box">
            <label className="label">New lie</label>
            <select
              value={offGreenLie}
              onChange={(e) => setOffGreenLie(e.target.value)}
            >
              <option value="fringe">Fringe</option>
              <option value="fairway">Fairway</option>
              <option value="rough">Rough</option>
              <option value="bunker">Bunker</option>
            </select>

            <label className="label">Remaining distance (yards)</label>
            <input
              type="number"
              min="1"
              step="1"
              placeholder="e.g. 6"
              value={offGreenYards}
              onChange={(e) => setOffGreenYards(e.target.value)}
            />
          </div>
        )}

        <button onClick={submitShot}>Submit Shot</button>

        <p className="total-sg">Total SG: {totalSG.toFixed(2)}</p>
      </div>

      {results.length > 0 && (
        <div className="card">
          <h3>Round So Far</h3>
          <div className="results-list">
            {results.slice().reverse().map((r) => (
              <div key={r.hole} className="result-row">
                <div>
                  <strong>Hole {r.hole}</strong>
                  <div className="subtle">
                    {r.lie} • {r.yards} yds → {r.result}
                  </div>
                </div>
                <div className={r.sg >= 0 ? "sg-positive" : "sg-negative"}>
                  {r.sg > 0 ? "+" : ""}
                  {r.sg.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
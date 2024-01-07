import React, { useState } from "react";

const FireSimulation = () => {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [fireSpreadProbability, setFireSpreadProbability] = useState(0.5);
  const [grid, setGrid] = useState(
    Array(height)
      .fill()
      .map(() => Array(width).fill(false))
  );
  const [isRunning, setIsRunning] = useState(false);

  const startSimulation = () => {
    const sim = new FireSimulation(width, height, fireSpreadProbability);
    sim.setCellOnFire(Math.floor(Math.random() * width), Math.floor(Math.random() * height));
    setGrid(sim.grid);
    setIsRunning(true);
    const interval = setInterval(() => {
      sim.simulateFireSpread();
      setGrid(sim.grid);
      if (sim.hasFireReachedEdges()) {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 100);
  };

  const stopSimulation = () => {
    setIsRunning(false);
  };

  return (
    <div>
      <h1>Forest Fire Simulation</h1>
      <label>
        Grid width:
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(parseInt(e.target.value))}
        />
      </label>
      <label>
        Grid height:
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(parseInt(e.target.value))}
        />
      </label>
      <label>
        Fire spread probability:
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={fireSpreadProbability}
          onChange={(e) =>
            setFireSpreadProbability(parseFloat(e.target.value))
          }
        />
        {fireSpreadProbability}
      </label>
      <button onClick={startSimulation}>Start simulation</button>
      <button onClick={stopSimulation}>Stop simulation</button>
      <div>
        {grid.map((row, y) => (
          <div key={y}>
            {row.map((cell, x) => (
              <div
                key={x}
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: cell ? "red" : "green",
                  display: "inline-block",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FireSimulation;

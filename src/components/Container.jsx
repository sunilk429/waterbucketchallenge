import { useEffect, useState } from "react";

const MAX_LEVEL = 160; //160 scaled for 1000
const MAX_REFILL = 32; //1000/160->5 => 160/5->32

const Container = ({ id, N, totalWaterLevel, setTotalWaterLevel }) => {
  const [level, setLevel] = useState(totalWaterLevel / N);
  const [intervalId, setIntervalId] = useState(null);
  const [counter, setCounter] = useState(0);
  const [percentage, setPercentage] = useState(
    ((totalWaterLevel / N + level) / MAX_LEVEL) * 100
  );

  console.log(`id: ${id} waterLevel:${level} totalWater:${totalWaterLevel}`);
  const handleAddWaterStart = () => {
    const id = setInterval(() => {
      if (level < MAX_LEVEL) {
        setLevel((prev) =>
          Math.min(prev + MAX_REFILL, MAX_LEVEL - totalWaterLevel / N)
        );
        setCounter((prev) =>
          Math.min(prev + 1, (MAX_LEVEL - totalWaterLevel / N) / MAX_REFILL)
        );
      }
    }, 1000);
    setIntervalId(id);
  };

  const handleAddWaterStop = (e) => {
    clearInterval(intervalId);
    setIntervalId(null);
    e.preventDefault();
    setTimeout(() => {
      if (level <= MAX_LEVEL * N) {
        setTotalWaterLevel((prev) =>
          Math.min(prev + MAX_REFILL * counter, MAX_LEVEL * N)
        );
      }
      setLevel(0);
      setCounter(0);
    }, 1000);
  };

  const handleEmptyWaterTank = () => {
    if (totalWaterLevel / N + level === 0) return;
    console.log(`reducedwater: ${totalWaterLevel / N}`);
    const reducedWater = totalWaterLevel / N;
    setLevel((prev) => -reducedWater);
    console.log(`handleEmpywater: ${level}`);
    setTimeout(() => {
      setTotalWaterLevel((prev) => prev - reducedWater);
      setLevel(0);
    }, 1000);
  };
  useEffect(() => {
    const newPercentage = ((totalWaterLevel / N + level) / MAX_LEVEL) * 100;
    const difference = newPercentage - percentage;
    const step = difference / 5; // Adjust the number of steps
    let currentPercentage = percentage;

    const intervalId = setInterval(() => {
      currentPercentage += step;
      setPercentage(Math.abs(currentPercentage));

      if (
        (step > 0 && currentPercentage >= newPercentage) ||
        (step < 0 && currentPercentage <= newPercentage)
      ) {
        clearInterval(intervalId);
      }
    }, 100); // Adjust timing for smoother or faster transition

    return () => clearInterval(intervalId);
  }, [totalWaterLevel, level, setLevel]);

  return (
    <div className="flex flex-col gap-8 p-4 max-w-80">
      <div className="flex flex-col gap-4 items-center">
        <button
          className="bg-green-700 select-none text-xl text-white border-none rounded-lg p-2"
          onMouseDown={handleAddWaterStart}
          onMouseUp={handleAddWaterStop}
          onTouchStart={handleAddWaterStart}
          onTouchEnd={handleAddWaterStop}
        >
          ADD
        </button>
        <button
          className="border-4 select-none text-red-700 text-xl border-red-700 rounded-lg p-2"
          onClick={handleEmptyWaterTank}
        >
          EMPTY
        </button>
      </div>

      <div
        className="relative border-8 border-t-0 rounded-t-none rounded-2xl overflow-hidden w-40 h-40 "
        style={{ height: "160px" }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 transition-all duration-1000"
          style={{
            height: `${totalWaterLevel / N + level}px`,
            background: "#74ccf4",
          }}
        ></div>
      </div>
      <div className="flex justify-center items-center">
        <span className="text-blue-700" style={{ transition: "width 0.5s" }}>
          {percentage.toFixed(2)} %
        </span>
      </div>
    </div>
  );
};

export default Container;

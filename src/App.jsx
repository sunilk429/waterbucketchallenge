import { useState } from "react";
import Container from "./components/Container";

const N = 4;

const App = () => {
  const [totalWaterLevel, setTotalWaterLevel] = useState(0);
  return (
    <div className="flex flex-col gap-12 justify-center items-center select-none pt-10 ">
      <h1
        className=" pt-4 text-4xl font-bold animate-bounce"
        style={{ color: "#74ccf4" }}
      >
        Water Bucket Challenge
      </h1>
      <div className="flex justify-center">
        {[...Array(N)].map((_, index) => (
          <Container
            key={index}
            id={index}
            N={N}
            totalWaterLevel={totalWaterLevel}
            setTotalWaterLevel={setTotalWaterLevel}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

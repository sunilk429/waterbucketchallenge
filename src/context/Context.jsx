import React, { createContext, useContext, useState } from "react";

const TotalWaterContext = createContext();

export const useTotalWater = () => useContext(TotalWaterContext);

export const TotalWaterProvider = ({ children }) => {
  const [totalWaterLevel, setTotalWaterLevel] = useState(0);
  return (
    <TotalWaterContext.Provider
      value={{
        totalWaterLevel,
        setTotalWaterLevel,
      }}
    >
      {children}
    </TotalWaterContext.Provider>
  );
};

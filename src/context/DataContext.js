import { useState, createContext } from "react";

const DataContext = createContext();

function DataProvider({ children }) {
  const [data, setData] = useState([]);

  const updateNewData = (value) => {
    setData(value);
  };

  const value = { data, updateNewData };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export { DataContext, DataProvider };

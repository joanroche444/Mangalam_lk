import { createContext, useContext, useState } from "react";

const IncomeContext = createContext();

export const IncomeProvider = ({ children }) => {
  const [incomeList, setIncomeList] = useState([]);

  const addIncome = (income) => {
    setIncomeList((prev) => [...prev, income]);
  };

  const totalIncome = incomeList.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

  return (
    <IncomeContext.Provider value={{ incomeList, addIncome, totalIncome }}>
      {children}
    </IncomeContext.Provider>
  );
};

export const useIncome = () => useContext(IncomeContext);

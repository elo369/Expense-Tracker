import axios from "axios";
import { createContext, useContext, useState } from "react";
import { SERVER_URL } from "../helpers/Constants";

export const ListContext = createContext(null);

export const ListProvider  = ({ children }) => {
  const [title, setTitle] = useState("");
  const [amout, setAmout] = useState(undefined);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [lists, setLists] = useState([])
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  
  // Fetch data from server and calculate income & expense totals
 const fetchData = async () => {
    try {
      let response = await axios.get(`${SERVER_URL}/getData`);
      const data = response.data;
      
      // Separate Income and Expense transactions
      const incomeTotal = data
        .filter((item) => item.Type === "Income")
        .reduce((sum, item) => sum + Number(item.Amout), 0);
      
      const expenseTotal = data
        .filter((item) => item.Type === "Expense")
        .reduce((sum, item) => sum + Number(item.Amout), 0);

      setIncome(incomeTotal);
      setExpense(expenseTotal);
      console.log("expanse",expense)
      
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  return (
    <ListContext.Provider
      value={{
        title,
        setTitle,
        amout,
        setAmout,
        category,
        setCategory,
        type,
        setType,
        lists, 
        setLists,
        income, 
        setIncome,
        expense, 
        setExpense,
        fetchData
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

// Custom Hook for using List Context
export const useList = () => {
  return useContext(ListContext);
};

import React, { useEffect, useState } from "react";
import { useList } from "../context/Context.jsx";


const BudgetTracker = () => {
  // Extracting income, expense, and fetchData function from context
  const { income,
    expense,
    fetchData
  } = useList()

  // Fetch data when component mounts or when income/expense updates
  useEffect(() => {
    fetchData();
    if (balance < 0) {
      alert("Warning: Your balance is negative!");
    }
  }, [income, expense]);

  const startingBudget = 1000;

  // Calculating balance based on income and expense
  const balance = startingBudget + income - expense;

  return (
    <div className="flex justify-center items-center relative lg:left-17 sm:top-8 md:top-0 md:right-0 sm:right-3 right-12">
      <div className="grid grid-cols-3  gap-4 p-2 rounded-lg shadow-lg md:right-15 lg:right-0 relative md:top-4">

        {/* Income Card */}
        <div className="lg:p-5 sm:p-5 p-2 text-center rounded-lg text-white font-bold bg-gradient-to-r from-green-400 to-green-600 md:h-20 lg:h-25 md:p-2 ">
          <h2 className="lg:text-xl md:text-sm sm:text-[14px] sm:mr-10 md:mr-0">Income</h2>
          <p className="lg:text-2xl md:text-sm">₹{income}</p>
        </div>

        {/* Expense Card */}
        <div className="lg:p-5 sm:p-5 p-2 text-center rounded-lg text-white font-bold bg-gradient-to-r from-red-400 to-red-600 md:h-20 lg:h-25 md:p-2">
          <h2 className="lg:text-xl md:text-sm sm:text-[14px] sm:mr-10 md:mr-0">Expense</h2>
          <p className="lg:text-2xl md:text-sm">₹{expense}</p>
        </div>

        {/* Balance Card */}
        <div className="lg:p-5 sm:p-5 p-2 text-center rounded-lg text-white font-bold bg-gradient-to-r from-blue-400 to-blue-600 md:h-20 lg:h-25 md:p-2">
          <h2 className="lg:text-xl md:text-sm sm:text-[14px] sm:mr-10 md:mr-0">Balance</h2>
          <p className="lg:text-2xl md:text-sm">₹{balance}</p>
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;

import React, { useContext, useEffect } from "react";
import Navbar from '../../components/navbar/navbar'
import Transactions from "../transaction/transaction";
import TransactionTable from "../transactiontable/transactiontable";
import {motion, AnimatePresence} from "framer-motion"
import { CiDark } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { ThemeContext } from "../../ThemeContext/ThemeContext";

const Dashboard = ({ getStatusColor, retrievedData, totalIncome, totalExpense, remainingBalance, progressBar, setGetStatusColor, setTotalIncome, setTotalExpense, setRemainingBalance, setProgressBar, setSaving, saving, setSavingProgressBar, SavingProgressBar,setEditTransactions,editTransactions,setRetrievedData }) => {
const {Theme,toggleTheme} = useContext(ThemeContext)
console.log(Theme);

  useEffect(() => {

    // Calculate all values when retrievedData changes
    const calculatedTotalIncome = retrievedData.reduce((total, i) => {
      if (i.type === "Income") return total + Number(i.amount)
      return total
    }, 0);

    const calculatedTotalExpense = retrievedData.reduce((total, e) => {
      if (e.type === "Expense") return total + Number(e.amount)
      return total
    }, 0);

    let calculatedSaving = retrievedData.reduce((total, a) => {
      if (a.type === "Saving") return total + Number(a.amount)
      return total
    }, 0);

    const calculatedRemainingBalance = calculatedTotalIncome - calculatedTotalExpense;
    const calculatedProgressBar = Math.min(((calculatedTotalExpense / calculatedTotalIncome) * 100), 100);
    const calculatedSavingProgressBar = (calculatedRemainingBalance<calculatedSaving)?Math.min(((calculatedRemainingBalance / calculatedTotalIncome) * 100), 100):Math.min(((calculatedSaving / calculatedTotalIncome) * 100), 100);

    if(calculatedRemainingBalance<=0){
      calculatedSaving = 0
    }else{
   calculatedSaving =Math.min(calculatedRemainingBalance,calculatedSaving) 
    } 

    // Set all states
    setGetStatusColor(() => {
      console.log(calculatedProgressBar);
      if (calculatedProgressBar >= 100) return "bg-red-500";
      if (calculatedProgressBar > 70 && calculatedProgressBar < 100) return "bg-yellow-500";
      return "bg-green-500";
    });

    setTotalIncome(calculatedTotalIncome);
    setTotalExpense(calculatedTotalExpense);
    setSaving(calculatedSaving);
    setRemainingBalance(calculatedRemainingBalance);
    setProgressBar(calculatedProgressBar);
    setSavingProgressBar(calculatedSavingProgressBar);

    console.log(getStatusColor);
    console.log(SavingProgressBar);
  }, [retrievedData]);

  return (
    <>
      <Navbar />
      <div className="navbar min-h-max p-8">

        {/* Welcome Section */}
        <div className="flex justify-between">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Welcome back, Saleena!</h1>
          <p className="text-gray-500 text-sm">Overview of your financial summary for current month</p>
        </div >
        <motion.button whileHover={{scale: 1.05}} className=" backGround h-7 px-6 pt-4 pb-8 cursor-pointer  rounded-[50%] " onClick={toggleTheme}><MdDarkMode /> </motion.button>
        {/* <CiDark /> */}
        </div>
        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">



          {/* Total Income */}
          <motion.div whileHover={{scale: 1.05}} className="backGround p-6 rounded-lg shadow">
            <p className="text-gray-500 text-sm mb-2">Total Income</p>
            <h2 className="text-2xl font-bold">{totalIncome}</h2>
            <p className="text-green-500 text-sm mt-2">
              Pkr
            </p>
          </motion.div>

          {/* Total Expense */}
          <motion.div whileHover={{scale: 1.05}} className="backGround p-6 rounded-lg shadow">
            <p className="text-gray-500 text-sm mb-2">Total Expense</p>
            <h2 className="text-2xl font-bold">{totalExpense}</h2>
            <p className="text-red-500 text-sm mt-2">
              Pkr
            </p>
          </motion.div>
          {/* Remaining Balance */}

          <motion.div whileHover={{scale: 1.05}} className="backGround p-6 rounded-lg shadow">
            <p className="text-gray-500 text-sm mb-2">{(totalExpense <= totalIncome) ? "Remaining Balance" : "Due Balance"}</p>
            <h2 className="text-2xl font-bold mb-4">{Math.abs(remainingBalance)}</h2>
            <p className="text-blue-500 text-sm mt-2">
              Pkr
            </p>
            <div className="flex gap-3">

            </div>
          </ motion.div>


        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

          {/* Spending Limit */}
          <motion.div whileHover={{scale: 1.03}} className="backGround p-6 rounded-lg shadow md:col-span-2">
            <p className="text-gray-500 text-sm mb-4">{(totalExpense <= totalIncome) ? "Spending Limit" : "Spending Limit Exceeded"}</p>
            <h2 className="text-xl font-bold mb-2">{totalExpense} used</h2>

            {/* Progress Bar */}
            <div className="w-180 bg-gray-200 h-3 rounded">
              <div className={`${getStatusColor} h-3 rounded `} style={{ width: `${ progressBar}%` }}></div>
            </div>
          </motion.div>

          {/* Saving Plans */}
          <motion.div whileHover={{scale: 1.05}} className="backGround p-6 rounded-lg shadow ">
            <p className="text-gray-500 text-sm mb-4">Saving Plans</p>
            <h2 className="text-xl  font-bold mb-2">{saving} pkr</h2>
            {/* Progress Bar */}
            <div className="w-83 bg-gray-200 h-3 rounded">
              <div className="bg-blue-500 h-3 rounded " style={{ width: `${(totalExpense>=totalIncome)? 0:SavingProgressBar }%` }} ></div>
            </div>


          </motion.div>

        </div>

        {/* Transactions Table */}
        <TransactionTable retrievedData={retrievedData} setEditTransactions={setEditTransactions} editTransactions={editTransactions} setRetrievedData={setRetrievedData}/>

      </div>
    </>
  );
};

export default Dashboard;

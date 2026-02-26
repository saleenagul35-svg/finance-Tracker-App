import { useContext, useState } from 'react'

import './App.css'
import Navbar from './components/navbar/navbar'
import Dashboard from "./components/dashboard/dashboard"
import Login from "./components/login/login"
import { Routes, Route } from "react-router-dom"
import Transactions from './components/transaction/transaction'
import AddTransaction from './components/addTransaction/addTransaction'
import Budget from './components/Budgets/Budgets'
import AddBudget from './components/addbudget/addBudget'
import TransactionTable from './components/transactiontable/transactiontable'

import Report from './components/Reports/Reports'

function App() {
  let currentMonth = new Date().toLocaleString("default", { month: "long" })

  //Adding Categories Section
  const [CategoryForm, setCategoryForm] = useState({
    CategoryName: "",
    CategoryLimit: ""

  });

  const [CsavedData, setCSavedData] = useState(() => {
    let saved = localStorage.getItem("CategoryNameData")
    return saved ? JSON.parse(saved) : []
  })



  // Unique Categories
  const [uniqueCategories, setUniqueCategories] = useState([])

  // Transactions section
  const [formDataT, setFormDataT] = useState({
    name: "",
    type: "",
    amount: "",
    date: "",
    category: "",
    status: "Completed",
  });

  // Total Income
  const [totalIncome, setTotalIncome] = useState(0)

  
  // Total Expense
  const [totalExpense, setTotalExpense] = useState(0)

  // Remaining Balance
  const [remainingBalance, setRemainingBalance] = useState(0)

  // Progress bar of spending Limit
  const [progressBar, setProgressBar] = useState(0)

  // get Status Color
  const [getStatusColor, setGetStatusColor] = useState("")

// Saving plans

const [saving, setSaving]= useState(0)

  // Progress bar of spending Limit
  const [SavingProgressBar, setSavingProgressBar] = useState(0)

  // Transaction saved data from local storage
  const [retrievedData, setRetrievedData] = useState(() => {
    const saved = localStorage.getItem("transactionData");
    return saved ?
      JSON.parse(saved)
      : [];
  })

  // Budget Section Data
  const [budgetData, setBudgetData] = useState({
    month: currentMonth,
    totalBudget: "",
    savingCategory: "New Car",
    savingTarget: ""
  });

  // Budgets saved data from local storage
  const [savedData, setSavedData] = useState(() => {
    let saved = localStorage.getItem("BudgetData")
    return saved ? JSON.parse(saved) : []
  })

  //editing the transactions

  const [editTransactions, setEditTransactions] = useState(false)

  return (
    <>



      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard formDataT={formDataT} retrievedData={retrievedData} totalIncome={totalIncome} totalExpense={totalExpense} remainingBalance={remainingBalance} progressBar={progressBar} getStatusColor={getStatusColor} setProgressBar={setProgressBar} setRemainingBalance={setRemainingBalance} setTotalExpense={setTotalExpense} setTotalIncome={setTotalIncome} setGetStatusColor={setGetStatusColor} saving={saving} setSaving={setSaving} SavingProgressBar={SavingProgressBar}  setSavingProgressBar={setSavingProgressBar} editTransactions={editTransactions} setEditTransactions={setEditTransactions} setRetrievedData={setRetrievedData}/>} />
        <Route path='/transaction' element={<Transactions formDataT={formDataT} retrievedData={retrievedData} editTransactions={editTransactions} setEditTransactions={setEditTransactions} setRetrievedData={setRetrievedData}  />} />
        <Route path='/addTransaction' element={<AddTransaction formDataT={formDataT} setFormDataT={setFormDataT} setRetrievedData={setRetrievedData} retrievedData={retrievedData} editTransactions={editTransactions} setEditTransactions={setEditTransactions}/>} />
        <Route path='/transactionTable' element={<TransactionTable editTransactions={editTransactions} setEditTransactions={setEditTransactions} setRetrievedData={setRetrievedData} retrievedData={retrievedData} />}/>
        <Route path='/Budget' element={<Budget retrievedData={retrievedData} savedData={savedData} setUniqueCategories={setUniqueCategories} uniqueCategories={uniqueCategories} setCategoryForm={setCategoryForm} CategoryForm={CategoryForm} setCSavedData={setCSavedData} CsavedData={CsavedData} progressBar={progressBar} getStatusColor={getStatusColor} />} />
        <Route path='/addBudget' element={<AddBudget budgetData={budgetData} savedData={savedData} setSavedData={setSavedData} setBudgetData={setBudgetData} CsavedData={CsavedData} uniqueCategories={uniqueCategories} />} />
        <Route path="/report" element={<Report retrievedData={retrievedData} />} />
      </Routes>

    </>
  )
}

export default App

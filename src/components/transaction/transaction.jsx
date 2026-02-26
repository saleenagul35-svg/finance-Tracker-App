import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import TransactionTable from "../transactiontable/transactiontable";
import {motion, AnimatePresence} from "framer-motion"

const Transactions = ({ retrievedData,setEditTransactions,editTransactions,setRetrievedData }) => {
  const navigate = useNavigate();

  const addTransaction = () => {
    navigate("/addTransaction")
  }

  return (
    <>
      <Navbar />
<section className="navbar h-screen">
      <TransactionTable retrievedData={retrievedData} setEditTransactions={setEditTransactions} editTransactions={editTransactions} setRetrievedData={setRetrievedData} />
      {/* Add Button */}
      <div className="flex justify-center">
        <motion.button
        whileHover={{scale: 1.05}}
          onClick={addTransaction}
          className="bg-blue-600 text-white px-4 py-2 rounded fixed bottom-10 right-10"
        >
          Make Transaction
        </motion.button>
      </div>

</section>

    </>
  );
};

export default Transactions;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";

const AddTransaction = ({ formDataT, setFormDataT, retrievedData, setRetrievedData, setEditTransactions, editTransactions }) => {
  const navigate = useNavigate()
  const transactionCategories = ["Food", "Transport", "Travelling", "Entertainment", "Education", "Health Care", "Income", "Bills", "Shopping", "Car", "Marraige", "PS5", "Others"]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormDataT((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addingtransactions = () => {
    if (editTransactions) {
      setRetrievedData(() =>
        retrievedData.map((b) =>
          editTransactions.id === b.id ?
            {
              ...b, 
              id: Date.now(),
              name: formDataT.name,
              category: formDataT.category,
              type: formDataT.type,
              amount: formDataT.amount,
              date: formDataT.date,
              status: formDataT.status,
            }
            : b
      )
      )

      setEditTransactions(false)
    }else {
  setRetrievedData((prev) => [
    ...prev,
    {
      id: Date.now(),
      name: formDataT.name,
      category: formDataT.category,
      type: formDataT.type,
      amount: formDataT.amount,
      date: formDataT.date,
      status: formDataT.status,

    }
  ])

}



setFormDataT({
  name: "",
  category: "",
  type: "",
  amount: "",
  date: "",

  status: "Completed",
});
  }
const onClose = () => {
  navigate("/transaction")
}
const handleSubmit = (e) => {
  e.preventDefault();

  addingtransactions();

  navigate("/transaction")

};
// const []


useEffect(() => {
  localStorage.setItem("transactionData", JSON.stringify(retrievedData));
}, [retrievedData]);

return (
  <>
    <Navbar />
    <section className="flex justify-center items-center navbar backGround h-screen">
      <div className=" backGround p-6 rounded-lg w-150">

        {/* Header with Close Button */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            Add New Transaction
          </h3>

          <button
            onClick={onClose}
            className="text-gray-600 text-xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            name="name"
            placeholder="Transaction Name"
            value={formDataT.name}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          />


          <select
            name="category"
            value={formDataT.category}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 ">

            <option value="" disabled>Select a Category</option>
            {transactionCategories.map((a, index) => (
              <option value={a} key={index} >{a}</option>
            ))}

          </select>
          <select
            name="type"
            value={formDataT.type}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 "
          >
            <option value="" disabled>Select a Type</option>
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
            <option value="Saving">Saving</option>
          </select>

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formDataT.amount}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          />

          <input
            type="date"
            name="date"
            value={formDataT.date}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          />

          <select
            name="status"
            value={formDataT.status}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          >
            <option>Completed</option>
            {/* <option>Pending</option>
              <option>Incomplete</option> */}
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg"
          >
            Save Transaction
          </button>

        </form>
      </div>
    </section>
  </>
);
};

export default AddTransaction;

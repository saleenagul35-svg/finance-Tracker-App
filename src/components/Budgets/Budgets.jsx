import React, { useState, useMemo, useEffect } from "react";
import Navbar from "../navbar/navbar";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion"
const Budget = ({ getStatusColor, progressBar, retrievedData, savedData, setUniqueCategories, uniqueCategories, CsavedData, setCSavedData, CategoryForm, setCategoryForm }) => {



  const navigate = useNavigate();
  const addBudgets = () => {
    navigate("/addBudget")
  }

  const handleDelete = (b) => {
    setCSavedData(prev =>
      prev.filter((f) =>
        f.CategoryName !== b
      )
    )
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setCategoryForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addingCat = () => {
    setCSavedData((prev) => [
      ...prev,
      {
        id: Date.now(),
        CategoryName: CategoryForm.CategoryName,
        CategoryLimit: CategoryForm.CategoryLimit,


      }
    ])


    setCategoryForm({
      CategoryName: "",
      CategoryLimit: "",

    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    addingCat();



  };
  useEffect(() => {
    setUniqueCategories(
      [...new Set(CsavedData.map((b) => b.CategoryName))]
    );
  }, [CsavedData]);


  useEffect(() => {
    localStorage.setItem("CategoryNameData", JSON.stringify(CsavedData));
  }, [CsavedData]);






  const getCategoryLimit = (categoryName) => {
    const category = CsavedData.find((b) => b.CategoryName === categoryName)
    return category ? category.CategoryLimit : 0;
  }



  return (
    <>
      <Navbar />
      <div className="p-8 navbar min-h-screen">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold ">Budget Overview</h1>
          {/* Add Button */}

          <motion.button
            whileHover={{ scale: 1.05 }}

            // onClick={addTransaction}
            className="bg-blue-600 text-white px-4 py-2 "
            onClick={addBudgets}>
            Make Budget
          </motion.button>
        </div>
        {/* Monthly Summary */}
        {savedData.map((e) => (
          <motion.div whileHover={{ scale: 1.02 }}
            className="backGround p-6 rounded-lg shadow mb-6">
            <p className="text-gray-500 mb-1"> Monthly Budget</p>
            <h2 className="text-xl font-bold">{e.totalBudget}</h2>

            <p className="mt-3 text-sm">
              Month: <span className="font-semibold">{e.month}</span>
            </p>

            {/* <p className="text-sm">
            Remaining:{" "}
            <span
              className={
                remainingMonthly < 0 ? "text-red-500 font-semibold" : "font-semibold"
              }
            >
              {remainingMonthly}
            </span>
          </p> */}

            {/* Progress bar */}
            <div className="w-274 bg-gray-200 h-3 rounded mt-4">
              <div
                className={`h-3 rounded ${getStatusColor}`}
                style={{ width: `${progressBar}%` }}
              ></div>
            </div>

            {progressBar > 100 && (
              <p className="text-red-500 text-sm mt-2">
                ⚠ You exceeded your monthly budget!
              </p>
            )}
          </motion.div>
        ))}
        {/* Category Budgets */}
        <div className="backGround p-6 rounded-lg shadow mb-6">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold mb-4">Category Budgets</h2>
            <div className="flex gap-5">
              <h2 className="text-lg font-semibold mb-4">Limits</h2>
              <h2 className="text-lg font-semibold mb-4">Delete</h2>
            </div>
          </div>
          {uniqueCategories.map((b, index) => {
            const limit = getCategoryLimit(b);

            return (
              <div key={index} className=" mb-5">
                <div className="flex justify-between">
                  <p className="font-medium">{b}</p>
                  <div className="flex gap-15" >
                    <p>
                      {limit}

                    </p>
                    <button onClick={() => handleDelete(b)}><MdDelete /></button>
                  </div>
                </div>

                {/* <div className="w-full bg-gray-200 h-2 rounded mt-2">
                  <div
                    className={`h-2 rounded ${getStatusColor}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>

                {remaining < 0 && (
                  <p className="text-red-500 text-sm mt-1">
                    Over budget by {Math.abs(remaining)}
                  </p>
                )} */}
              </div>
            );
          })}
        </div>

        {/* Add Budget Form */}
        <div className="backGround p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
          <form className="flex gap-4" onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Category"
              name="CategoryName"
              value={CategoryForm.CategoryName}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />

            <input
              type="number"
              name="CategoryLimit"
              // maxLength={1000}
              placeholder="Limit"
              value={CategoryForm.CategoryLimit}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />

            <motion.button whileHover={{ scale: 1.05 }}


              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add
            </motion.button>


          </form>
        </div>

      </div>
    </>
  );
};

export default Budget;

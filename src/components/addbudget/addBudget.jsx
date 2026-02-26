import { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import { useNavigate } from "react-router-dom";

function AddBudget({ budgetData, setBudgetData, setSavedData, savedData,CsavedData,uniqueCategories }) {



    const navigate = useNavigate()
    const moveTOBudgets = () => {
        navigate("/Budget")
    }
    const savingCategories = [
        "New Car",
        "Marriage",
        "House",
        "Vacation",
        "Emergency Fund"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBudgetData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const savingBudget = () => {
        setSavedData((prev) => [
            ...prev,
            {
                id: Date.now(),
                month: budgetData.month,
                totalBudget: budgetData.totalBudget,
                savingCategory: budgetData.savingCategory,
                savingTarget: budgetData.savingTarget
            }
        ])
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        savingBudget();
        // if (!budgetData.month || !budgetData.totalBudget) return;

        console.log("Budget Submitted:", budgetData);

        // reset form
        setBudgetData({
            month: "",
            totalBudget: "",
            savingCategory: "New Car",
            savingTarget: ""
        });
    };
    useEffect(() => {
        localStorage.setItem("BudgetData", JSON.stringify(savedData))
    }, [savedData])
    return (
        <>
            <Navbar />
            <section className="h-[90vh] backGround p-8">
            <div className="max-w-md mx-auto backGround mt-20  p-6 rounded-xl shadow-lg">
                <h2 className="text-xl  font-semibold mb-4">Add Monthly Budget</h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Select Month */}
                    <div>
                        <label className="block mb-1 font-medium">Month</label>
                        <input
                            type="text"
                            name="month"
                            placeholder={budgetData.month}
                            value={budgetData.month}
                            onChange={handleChange}
                            readOnly
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    {/* Total Budget */}
                    <div>
                        <label className="block mb-1 font-medium">Total Budget</label>
                        <input
                            type="number"
                            name="totalBudget"
                            placeholder="Enter total budget"
                            value={budgetData.totalBudget}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    {/* Saving Plan Section
                    {(uniqueCategories.length>0) &&
                    <div className="border-t pt-4">
                        <h3 className="font-semibold mb-2">Saving Plan</h3>

                        <div>
                            <label className="block mb-1">Category</label>
                            <select
                                name="savingCategory"
                                value={budgetData.savingCategory}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded"
                            >
                                {uniqueCategories.map((cat, index) => (
                                    <option key={index} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mt-2">
                            <label className="block mb-1">Target Amount</label>
                            <input
                                type="number"
                                name="savingTarget"
                                placeholder="Enter saving target"
                                value={budgetData.savingTarget}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    </div>
                                } */}
                    {/* Submit */}
                    <button
                        type="submit"
                        onClick={moveTOBudgets}
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                    >
                        Add Budget
                    </button>
                </form>
            </div>
            </section>
        </>
    );
}

export default AddBudget;

import React, { useMemo } from "react";
import Navbar from "../navbar/navbar";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const Report = ({ retrievedData }) => {

  /* ====== CALCULATIONS ====== */
  const { totalIncome, totalExpense, totalSaving, remainingBalance } =
    useMemo(() => {
      let income = 0;
      let expense = 0;
      let saving = 0;

      retrievedData.forEach((item) => {
        if (item.type === "Income") income += Number(item.amount);
        if (item.type === "Expense") expense += Number(item.amount);
        if (item.type === "Saving") saving += Number(item.amount);
      });

      return {
        totalIncome: income,
        totalExpense: expense,
        totalSaving: saving,
        remainingBalance: income - expense,
      };
    }, [retrievedData]);

  /* ====== BAR CHART DATA ====== */
  const barData = [
    { name: "Income", amount: totalIncome },
    { name: "Expense", amount: totalExpense },
    { name: "Remaining", amount: remainingBalance }
  ];

  /* ====== PIE CHART DATA ====== */
  const pieData = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense },
    { name: "Saving", value: totalSaving }
  ];

  const COLORS = ["#16a34a", "#dc2626", "#2563eb"];

  return (
    <>
      <Navbar />
      <div className="navbar p-8 min-h-screen">

        <h1 className="text-2xl font-bold mb-6">Financial Report</h1>

        {/* ===== BAR CHART ===== */}
        <div className="backGround p-6 rounded-lg shadow mb-8">
          <h2 className="text-lg font-semibold mb-4">Income vs Expense vs Remaining</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ===== PIE CHART ===== */}
        <div className="backGround p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Distribution Overview</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </>
  );
};

export default Report;
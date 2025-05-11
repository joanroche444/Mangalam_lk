import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Pencil, Save, X, Download } from "lucide-react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default function ExpenseTracker() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ category: "", amount: "" });
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [editedExpense, setEditedExpense] = useState({ category: "", amount: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = "12344";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeRes = await fetch(`http://localhost:5000/api/income/get?userId=${userId}`);
        const incomeData = await incomeRes.json();
        setIncome(incomeData.amount || 0);

        const expenseRes = await fetch(`http://localhost:5000/api/expense/get?userId=${userId}`);
        const expenseData = await expenseRes.json();
        setExpenses(expenseData);
      } catch (err) {
        setError("Failed to fetch data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddExpense = async () => {
    const { category, amount } = newExpense;
    if (!category.trim() || isNaN(amount) || amount <= 0) return;

    const expenseData = {
      userId,
      category: category.trim(),
      amount: parseFloat(amount),
      date: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:5000/api/expense/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenseData),
      });

      if (res.ok) {
        const updatedRes = await fetch(`http://localhost:5000/api/expense/get?userId=${userId}`);
        const updatedData = await updatedRes.json();
        setExpenses(updatedData);
        setNewExpense({ category: "", amount: "" });
      }
    } catch (err) {
      console.error("Error adding expense", err);
    }
  };

  const handleRemoveExpense = async (expenseId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/expense/${expenseId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setExpenses((prev) => prev.filter((exp) => exp._id !== expenseId));
      }
    } catch (err) {
      console.error("Error removing expense", err);
    }
  };

  const handleEditClick = (expense) => {
    setEditingExpenseId(expense._id);
    setEditedExpense({
      category: expense.category,
      amount: expense.amount,
      date: expense.date,
    });
  };

  const handleSaveEdit = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/expense/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editedExpense,
          amount: parseFloat(editedExpense.amount),
        }),
      });

      if (res.ok) {
        const updatedRes = await fetch(`http://localhost:5000/api/expense/get?userId=${userId}`);
        const updatedData = await updatedRes.json();
        setExpenses(updatedData);
        setEditingExpenseId(null);
      }
    } catch (err) {
      console.error("Error updating expense", err);
    }
  };

  const handleDownloadExcel = () => {
    fetch(`http://localhost:5000/api/expense/downloadexcel?userId=${userId}`, {
      method: "GET",
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "expenses.xlsx";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Download failed", error);
      });
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  // Group expenses by category
  const categoryData = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: ['#D9B68C', '#B87F52', '#8E5C3A', '#4B3A28', '#3E2A20'], // Shades of brown
      },
    ],
  };

  return (
    <div className="bg-[#EBD4C8] min-h-screen">
      <div
        className="relative w-full h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3835638/pexels-photo-3835638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        }}
      >
        <motion.h1
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-5xl font-bold font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Add your expenses!
        </motion.h1>
      </div>

      <div className="mt-6 text-center bg-[#dddad9] px-6 py-3 rounded-lg shadow-lg text-xl font-semibold">
        <div>Total Income: <span className="text-green-600">Rs.50000</span></div>
        <div className="mt-2">Total Expenses: <span className="text-red-600">Rs. {totalExpenses}</span></div>
      </div>

      <div className="mt-8 w-full bg-[#dfdedd] max-w-3xl mx-auto p-8 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-[#A85D50] text-center">Your Overall Expenses</h2>

       <div className="w-full mb-8 flex justify-center">
  <div className="relative w-full flex justify-center" style={{ height: '400px' }}>
    <Pie
      data={pieChartData}
      options={{
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'top',
            align: 'center', // Centers the legend horizontally
            labels: {
              boxWidth: 40,
              padding: 25,
              font: {
                size: 14, // Adjust the font size for better readability
              },
            },
          },
        },
      }}
    />
  </div>
</div>


        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : expenses.length === 0 ? (
          <p className="text-gray-500">No expenses yet.</p>
        ) : (
          <ul>
            {expenses.map((exp) => (
              <li
                key={exp._id}
                className="flex justify-between p-4 border-b hover:bg-gray-100 rounded-lg transition-all"
              >
                {editingExpenseId === exp._id ? (
                  <div className="flex w-full justify-between items-center gap-4">
                    <input
                      type="text"
                      value={editedExpense.category}
                      onChange={(e) => setEditedExpense({ ...editedExpense, category: e.target.value })}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="number"
                      value={editedExpense.amount}
                      onChange={(e) => setEditedExpense({ ...editedExpense, amount: e.target.value })}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                    <div className="flex gap-2">
                      <Save
                        size={20}
                        className="text-green-600 cursor-pointer"
                        onClick={() => handleSaveEdit(exp._id)}
                      />
                      <X
                        size={20}
                        className="text-red-500 cursor-pointer"
                        onClick={() => setEditingExpenseId(null)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between w-full items-center">
                    <div className="flex items-center gap-4">
                      <Minus
                        size={20}
                        className="text-[#A85D50] cursor-pointer"
                        onClick={() => handleRemoveExpense(exp._id)}
                      />
                      <span className="text-[#A85D50] font-medium">{exp.category}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[#A85D50] text-xl">Rs. {exp.amount}</span>
                      <Pencil
                        size={20}
                        className="text-brown-600 cursor-pointer"
                        onClick={() => handleEditClick(exp)}
                      />
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex justify-between gap-4">
          <input
            type="text"
            value={newExpense.category}
            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            placeholder="Category"
            className="p-2 border border-gray-300 rounded-md w-full"
          />
          <input
            type="number"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            placeholder="Amount"
            className="p-2 border border-gray-300 rounded-md w-full"
          />
          <Plus
            size={50}
            className="text-green-600 cursor-pointer"
            onClick={handleAddExpense}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleDownloadExcel}
            className="bg-[#A85D50] text-white py-2 px-6 rounded-md shadow-lg"
          >
            Download Excel
          </button>
        </div>
      </div>
    </div>
  );
}

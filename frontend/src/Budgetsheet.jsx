import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Trash } from "lucide-react";

export default function ExpenseTracker() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ category: "", amount: "" });

  useEffect(() => {
    fetch("http://localhost:5000/api/income/get")
      .then((res) => res.json())
      .then((data) => {
        const userIncome = data.find((item) => item.userId === "12344");
        if (userIncome) setIncome(userIncome.amount);
      });
  }, []);

  const handleAddExpense = async () => {
    if (!newExpense.category || !newExpense.amount) return;
    const expenseData = {
      userId: "12344",
      category: newExpense.category,
      amount: parseFloat(newExpense.amount),
      date: new Date().toISOString(),
    };
    
    try {
      const res = await fetch("http://localhost:5000/api/expense/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenseData),
      });
      if (res.ok) {
        setExpenses([...expenses, expenseData]);
        setNewExpense({ category: "", amount: "" });
      }
    } catch (error) {
      console.error("Error adding expense", error);
    }
  };

  return (
    <div className="bg-[#EBD4C8] min-h-screen">
    {/* Image with Expense Tracker text */}
    <div className="relative w-full h-[50vh] bg-cover bg-center" style={{ backgroundImage: "url('https://www.liveenhanced.com/wp-content/uploads/2019/09/wedding-decoration-10.jpg')" }}>
      <motion.h1
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black text-5xl font-bold font-serif italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Expense Tracker
      </motion.h1>
    </div>
      
      {/* Income Display */}
      <div className="mt-6 text-center bg-[#EBD4C8] px-6 py-3 rounded-lg shadow-lg text-xl font-semibold">
        Total Income: <span className="text-green-600">${income}</span>
      </div>

    {/* Expenses Card */}
    <div className="mt-8 w-full max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-[#A85D50]">Expenses</h2>

        {/* Expense List */}
        <ul>
          {expenses.map((exp, index) => (
            <li key={index} className="flex justify-between p-4 border-b hover:bg-gray-100 rounded-lg transition-all">
              <div className="flex items-center space-x-4">
                <Plus size={20} className="text-[#A85D50]" />
                <span className="text-[#A85D50] font-medium">{exp.category}</span>
              </div>
              <span className="text-[#A85D50] text-xl">-${exp.amount}</span>
            </li>
          ))}
        </ul>

        {/* Add Expense Form */}
        <div className="mt-8 flex gap-6 items-center">
          <input
            type="text"
            placeholder="Category"
            value={newExpense.category}
            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            className="p-3 border border-[#A85D50] rounded-lg flex-1"
          />
          <input
            type="number"
            placeholder="Amount"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            className="p-3 border border-[#A85D50] rounded-lg flex-1"
          />
          <button
            onClick={handleAddExpense}
            className="p-3 bg-[#A85D50] text-white rounded-lg hover:bg-[#D4B59A] transition"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

   {/* Back Button */}
   <div className="flex justify-center mt-8">
        <button
         // onClick={handleBackClick}
          className="px-6 py-3 bg-[#A85D50] text-white rounded-lg hover:bg-[#D4B59A] transition"
        >
          Back
        </button>
      </div>
    </div>
  );
}
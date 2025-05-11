const xlsx = require('xlsx');
const Expense = require("../models/Expense");
const path = require("path");
const fs = require('fs');

// Add expense source
exports.addExpense = async (req, res) => {
    try {
        const { userId, icon, category, amount, date } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date),
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Get all expenses
exports.getAllExpense = async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ date: -1 });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Server Error", details: error.message });
    }
};

// Delete expense source
exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update expense source
exports.updateExpense = async (req, res) => {
    try {
        const { category, amount, date, icon } = req.body;

        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            { category, amount, date: new Date(date), icon },
            { new: true }
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Download expenses as Excel
exports.downloadExpenseExcel = async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ date: -1 });

        const data = expenses.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expenses");

        const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });

        res.setHeader("Content-Disposition", "attachment; filename=expense_details.xlsx");
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.end(buffer); // Send raw binary to avoid corruption
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

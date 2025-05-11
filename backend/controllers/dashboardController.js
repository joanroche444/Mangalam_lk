const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Types } = require("mongoose");

// Dashboard Data
exports.getDashboardData = async (req, res) => {
    try {
        // Fetch total income & expenses
        const totalIncome = await Income.aggregate([
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        const totalExpense = await Expense.aggregate([
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        // Get income transactions in the last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        // Get total income for last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Get expense transactions in the last 30 days
        const last30DaysExpenseTransactions = await Expense.find({
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        // Get total expenses for last 30 days
        const expensesLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Fetch last 5 transactions (income + expenses)
        const lastTransactions = [
            ...(await Income.find().sort({ date: -1 }).limit(5)).map((txn) => ({
                ...txn.toObject(),
                type: "income",
            })),
            ...(await Expense.find().sort({ date: -1 }).limit(5)).map((txn) => ({
                ...txn.toObject(),
                type: "expense",
            })),
        ].sort((a, b) => b.date - a.date); // Sort latest to first

        // Final Response
       /* res.json({
            totalBalance:
                (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpenses: totalExpense[0]?.total || 0,
            last30DaysExpenses: {
                total: expensesLast30Days,
                transactions: last30DaysExpenseTransactions,
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            recentTransactions: lastTransactions,
        });*/
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Server Error", error });
    }
};

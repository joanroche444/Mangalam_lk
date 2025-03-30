//const xlsx = require ('xlsx');
const Expense= require("../models/Expense")
const path = require("path");

//Add expense source
exports.addExpense = async (req,res) => {
    
try{
    const {userId,icon, category, amount, date} = req.body;

    //Validation checking for missing fields
    if (!category || !amount || !date){
        return res.status(400).json({message: "All fields are required"});
    }
    const newExpense = new Expense ({
        userId,
        icon,
        category,
        amount,
        date: new Date (date)
    });
    await newExpense.save();
    res.status(200).json(newExpense);
    }catch (error){
        res.status(500).json({message: "Server Error"});
    }
};

exports.getAllExpense = async (req, res) => {
    try {
      const expense = await Expense.find().sort({ date: -1 }); // Fetch all income records
      res.json(expense);
    } catch (error) {
      res.status(500).json({ message: "Server Error", details: error.message });
    }
  };

//Delete expense source
exports.deleteExpense = async (req,res) => {
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message: "Expense deleted successfully"});
    } catch (error){
        res.status(500).json({ message: "Server error"});
    }
}

/* Download Expense Excel
exports.downloadExpenseExcel = async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ date: -1 }); // Fetch all expenses

        // Prepare data for Excel
        const data = expenses.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
        }));

        // Create a new workbook and worksheet
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expenses");

        // Define file path
        const filePath = path.join(__dirname, "expense_details.xlsx");
        xlsx.writeFile(wb, filePath);

        // Send file as response
        res.setHeader("Content-Disposition", "attachment; filename=expense_details.xlsx");
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.download(filePath);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};*/
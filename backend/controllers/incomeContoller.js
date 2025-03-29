const xlsx = require ('xlsx');
const Income= require("../models/Income")

//Add income source
exports.addIncome = async (req,res) => {
    
try{
    const {userId, icon, source, amount, date} = req.body;

    //Validation checking for missing fields
    if (!source || !amount || !date){
        return res.status(400).json({message: "All fields are required"});
    }
    const newIncome = new Income ({
        userId,
        icon,
        source,
        amount,
        date: new Date (date)
    });
    await newIncome.save();
    res.status(200).json(newIncome);
    }catch (error){
        res.status(500).json({message: "Server Error"});
    }
};

exports.getAllIncome = async (req, res) => {
    try {
      const income = await Income.find().sort({ date: -1 }); // Fetch all income records
      res.json(income);
    } catch (error) {
      res.status(500).json({ message: "Server Error", details: error.message });
    }
  };

//Delete income source
exports.deleteIncome = async (req,res) => {
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({message: "Income deleted successfully"});
    } catch (error){
        res.status(500).json({ message: "Server error"});
    }
}


// Download Excel
exports.downloadIncomeExcel = async (req, res) => {
    try {
        // Fetch all income records (no user restriction)
        const income = await Income.find().sort({ date: -1 });

        // Prepare data for Excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toISOString(), // Ensure date is formatted properly
        }));

        // Create a new workbook and worksheet
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        // Write file to a buffer
        const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });

        // Set response headers
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="income_details.xlsx"'
        );
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        // Send file as response
        res.send(buffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

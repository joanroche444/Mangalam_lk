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
}

//Get all income source
exports.getAllIncome = async (req,res) => {}

//Delete income source
exports.deleteIncome = async (req,res) => {}
 
//Download Excel
exports.downloadIncomeExcel = async (req,res) => {}

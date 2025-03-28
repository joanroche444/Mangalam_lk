const mongoose = require ("mongoose");
//const { applyTimestamps } = require("./Vendors");

const IncomeSchema = new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    icon: {type:String},
    source: {type: String, required: true}, //ex salary
    amount: {type:Number, required:true},
    date: {type: Date, default: Date.now},
}, {timestamps: true});

module.exports = mongoose.model("Income", IncomeSchema);

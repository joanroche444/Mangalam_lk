const express = require("express");
const {
    addExpense,
    getAllExpense,
    deleteExpense,
    updateExpense,
    downloadExpenseExcel
} = require("../controllers/expenseController");
//const {protect} = require("../middleware//authMiddleware");

const router = express.Router();

router.post("/add",addExpense,);
router.get("/get",getAllExpense);
router.put("/:id", updateExpense);
router.get("/downloadexcel", downloadExpenseExcel);
router.delete("/:id",deleteExpense);

module.exports = router;
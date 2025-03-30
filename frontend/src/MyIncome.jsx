import { motion } from "framer-motion";
import { PlusCircle, DollarSign } from "lucide-react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";

export default function Dashboard() {
  return (
    <div>
        <Navbar />
    <div className="bg-[#EBD4C8] min-h-screen flex flex-col items-center justify-center p-6">
      <motion.h1
        className="text-white text-5xl font-bold mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Expense Tracker Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Add Income Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center transition-all cursor-pointer"
          onClick={() => alert("Navigate to Add Income")}
        >
          <DollarSign size={48} className="text-[#A85D50] mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800">Add Income</h2>
        </motion.div>

        {/* Add Expense Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center transition-all cursor-pointer"
          onClick={() => alert("Navigate to Add Expense")}
        >
          <PlusCircle size={48} className="text-[#A85D50] mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800">Add Expense</h2>
        </motion.div>
      </div>
    </div>
    <Footer />
    </div>
  );
}

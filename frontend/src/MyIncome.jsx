import { motion } from "framer-motion";
import { PlusCircle, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate


export default function Dashboard() {
  const [messageIndex, setMessageIndex] = useState(0);
  const navigate = useNavigate(); // Initialize navigate

  const messages = [
    "Welcome to your Expense Tracker Dashboard!",
    "Track your income and expenses effortlessly.",
  ];

  // Change message every 6 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 6000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
    
      <div className="bg-[#EBD4C8] min-h-screen flex flex-col items-center justify-center py-12 px-6">
        {/* Animated Heading */}
        <motion.h1
          className="text-white text-5xl font-extrabold mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Expense Tracker Dashboard
        </motion.h1>

        {/* Animated Message */}
        <motion.p
          className="text-xl text-gray-800 font-medium mb-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {messages[messageIndex]}
        </motion.p>

        {/* Add Income and Add Expense Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl">
          {/* Add Income Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center transition-all cursor-pointer hover:shadow-2xl"
            onClick={() => navigate("/income")} // Navigate to /income
          >
            <DollarSign size={56} className="text-[#A85D50] mb-6" />
            <h2 className="text-2xl font-semibold text-gray-800">Add Income</h2>
          </motion.div>

          {/* Add Expense Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center transition-all cursor-pointer hover:shadow-2xl"
            onClick={() => navigate("/budget")} // Navigate to /budget
          >
            <PlusCircle size={56} className="text-[#A85D50] mb-6" />
            <h2 className="text-2xl font-semibold text-gray-800">Add Expense</h2>
          </motion.div>
        </div>
      </div>
      
    </div>
  );
}
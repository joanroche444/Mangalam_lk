import React from "react";
import { motion } from "framer-motion";

const ChatbotBack = () => {
  return (
    <div className="bg-[#EBD4C8] min-h-screen text-black">
      {/* Section 1 */}
      <div className="container mx-auto flex flex-col md:flex-row items-center py-16 px-6">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }} 
          className="md:w-1/2 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            We Have a Chatbot to Assist You!
          </h1>
          <p className="text-lg text-gray-700">
            Get real-time customer support with our personalized chatbot, ensuring you have a seamless booking experience.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }} 
          className="md:w-1/2 mt-8 md:mt-0"
        >
          <img 
            src="https://www.linandjirsablog.com/wp-content/uploads/new/2018/02/21-maldives-island-south-asia-post-wedding-photography-1600x1066.jpg" 
            alt="Scenic View" 
            className="w-full rounded-lg shadow-lg"
          />
        </motion.div>
      </div>

      {/* Section 2 */}
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center py-16 px-6">
        {/* Image */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }} 
          className="md:w-1/2 mt-8 md:mt-0"
        >
          <img 
            src="https://www.newswire.lk/wp-content/uploads/2023/05/hsl-1.jpg" 
            alt="Hotel View" 
            className="w-full rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }} 
          className="md:w-1/2 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Comfort, Our Priority
          </h2>
          <p className="text-lg text-gray-700">
            From booking your stay to getting instant support, our chatbot ensures you enjoy a stress-free experience.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatbotBack;

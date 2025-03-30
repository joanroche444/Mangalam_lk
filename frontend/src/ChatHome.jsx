import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";

const ChatHome = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const texts = [
    "We have a chatbot to assist you!",
    "Book with confidence, our AI assistant is here!",
    "Personalized support just for you!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    setMessages([...messages, { text: question, sender: "user" }]);
    try {
      const response = await fetch("http://localhost:5003/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.answer, sender: "bot" }]);
    } catch (error) {
      console.error("Error:", error);
    }
    setQuestion("");
  };

  return (
    <div>
      < Navbar />
    <div className="bg-[#EBD4C8] min-h-screen flex flex-col items-center">
       <h1 className="text-4xl md:text-6xl font-bold font-serif italic text-black italic mb-4">welcome to customer support!!</h1>
          <motion.h1
            key={textIndex}
            className="text-3xl md:text-5xl font-bold text-black italic"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.6 }}
          ></motion.h1>
      {/* Hero Section */}
      <div className="w-full max-w-7xl p-8 flex flex-col md:flex-row items-center gap-12">
        {/* Left Content */}
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          
          <motion.h1
            key={textIndex}
            className="text-3xl md:text-5xl font-bold text-black italic"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.6 }}
          >
            {texts[textIndex]}
          </motion.h1>
          <p className="text-lg mt-4 text-black max-w-lg italic">
            As you book, we offer customer assistance with our personalized chatbot. Get instant support and book with ease!
          </p>
        </motion.div>
        {/* Right Image */}
        <motion.img
          src="https://www.linandjirsablog.com/wp-content/uploads/new/2018/02/21-maldives-island-south-asia-post-wedding-photography-1600x1066.jpg"
          alt="Maldives Island"
          className="md:w-1/2 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />
      </div>

      {/* Second Section */}
      <div className="w-full max-w-7xl p-8 flex flex-col md:flex-row-reverse items-center gap-12">
        {/* Left Content */}
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black italic">Your Big day</h2>
          <p className="text-lg mt-4 text-black max-w-lg italic">
            Let us enhance your experience with seamless booking and real-time assistance. wedding planning made easy with AI
          </p>
        </motion.div>
        {/* Right Image */}
        <motion.img
          src="https://www.newswire.lk/wp-content/uploads/2023/05/hsl-1.jpg"
          alt="Hotel Resort"
          className="md:w-1/2 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />
      </div>

      {/* Chatbot Icon */}
      <motion.div
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#A85D50] rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl hover:scale-110 transition-transform duration-300"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ rotate: -10 }}
      >
        <span className="text-lg font-semibold">🤖</span>
      </motion.div>

      {/* Chatbox */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-96 h-[520px] bg-[#F5E6E0] border-4 border-[#A85D50] rounded-2xl shadow-2xl flex flex-col">
          <div className="bg-[#A85D50] text-white text-lg font-bold p-3 flex justify-between items-center rounded-t-2xl shadow-md">
            💬 Lia
            <button onClick={() => setIsOpen(false)} className="text-xl">❌</button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
  {messages.map((msg, index) => (
    <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
      <span
        className={`px-4 py-2 rounded-lg max-w-[75%] text-sm shadow-md ${msg.sender === "user" ? "bg-[#A85D50] text-white" : "bg-white text-black shadow-sm"}`}
        dangerouslySetInnerHTML={{ __html: msg.text }} // Render HTML tags
      />
    </div>
  ))}
</div>

          <div className="flex items-center p-3 border-t border-[#A85D50] shadow-inner">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="flex-1 px-4 py-2 rounded-full border border-[#A85D50] outline-none text-sm shadow-sm"
              placeholder="Ask something..."
            />
            <button
              onClick={handleAskQuestion}
              className="ml-3 px-3 py-2 bg-[#A85D50] text-white rounded-full shadow-md hover:shadow-lg"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
    <Footer />
    </div>
  );
};

export default ChatHome;

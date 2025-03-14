import React, { useState } from "react";

const ChatHome = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Toggle chatbox visibility

  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    setMessages([...messages, { text: question, sender: "user" }]);

    try {
      const response = await fetch("http://localhost:5003/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      setMessages([...messages, { text: question, sender: "user" }, { text: data.answer, sender: "bot" }]);
    } catch (error) {
      console.error("Error:", error);
    }

    setQuestion("");
  };

  return (
    <>
      {/* Bot Icon */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          backgroundColor: "#ff90bc",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        🤖
      </div>

      {/* Chatbox */}
      {isOpen && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "320px",
            height: "450px",
            borderRadius: "20px",
            padding: "10px",
            position: "fixed",
            bottom: "90px",
            right: "20px",
            backgroundColor: "#fef5ff",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            border: "3px solid #ff90bc",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {/* Chatbot Header */}
          <div
            style={{
              backgroundColor: "#ff90bc",
              color: "white",
              textAlign: "center",
              padding: "10px",
              fontSize: "18px",
              fontWeight: "bold",
              borderRadius: "15px 15px 0 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            💬 Lia 
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              ❌
            </button>
          </div>

          {/* Chat Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
            {messages.map((msg, index) => (
              <div key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left", marginBottom: "8px" }}>
                <span
                  style={{
                    backgroundColor: msg.sender === "user" ? "#ffb6c1" : "#fff",
                    padding: "10px",
                    borderRadius: "12px",
                    display: "inline-block",
                    maxWidth: "75%",
                    color: msg.sender === "user" ? "#fff" : "#000",
                    fontSize: "14px",
                    boxShadow: "1px 1px 5px rgba(0,0,0,0.1)",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input Field */}
          <div style={{ display: "flex", alignItems: "center", padding: "5px" }}>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "20px",
                border: "1px solid #ff90bc",
                outline: "none",
                fontSize: "14px",
              }}
              placeholder="Ask something..."
            />
            <button
              onClick={handleAskQuestion}
              style={{
                marginLeft: "5px",
                padding: "8px 12px",
                borderRadius: "50%",
                border: "none",
                backgroundColor: "#ff90bc",
                color: "#fff",
                cursor: "pointer",
                fontSize: "14px",
                boxShadow: "1px 1px 5px rgba(0,0,0,0.2)",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatHome;

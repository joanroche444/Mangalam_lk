import React, { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Navbar from "./Navbar";
import Footer from "./Footer";

const guests = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank"]; // Dummy guest names

const SeatingChart = () => {
  const [seats, setSeats] = useState(Array(40).fill(null)); // 40 empty seats
  const pdfRef = useRef(null); // For PDF generation

  // Drag-and-Drop Handlers
  const handleDragStart = (event, guest) => {
    event.dataTransfer.setData("text/plain", guest);
  };

  const handleDrop = (event, index) => {
    event.preventDefault();
    const guest = event.dataTransfer.getData("text/plain");

    // Validate if the guest is already seated
    if (seats.includes(guest)) {
      alert(`${guest} is already seated! Please choose another guest.`);
      return; // Stop the operation if the guest is already seated
    }

    setSeats((prevSeats) => {
      const newSeats = [...prevSeats];
      newSeats[index] = guest; // Assign guest to seat
      return newSeats;
    });
  };

  const handleDragOver = (event) => event.preventDefault();

  const generatePDF = () => {
    if (!pdfRef.current) {
      alert("Seating chart is empty! Please arrange the seats first.");
      return; // Prevent PDF export if no seats are arranged
    }
  
    // Use a timeout to ensure everything has been rendered
    setTimeout(() => {
      html2canvas(pdfRef.current, {
        useCORS: true,  // Enable cross-origin resource sharing if needed
        scale: 2, // Increase scale for better resolution
        logging: true, // Enable logging to debug
        letterRendering: true, // Improve text rendering
        backgroundColor: "#ffffff", // Set a solid background color (no transparency)
      }).then((canvas) => {
        // Check if the canvas has content
        if (!canvas) {
          console.error("Error: Canvas is empty");
          alert("There was an error generating the PDF. Please try again.");
          return;
        }
  
        const imgData = canvas.toDataURL("image/png");
  
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 10, 10, 190, 0); // Adjust the size as needed
        pdf.save("seating-chart.pdf"); // Save PDF to the user
      }).catch((err) => {
        console.error("Error generating PDF:", err);
        alert("There was an error generating the PDF. Please try again.");
      });
    }, 1000); // Delay to ensure rendering completes
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-semibold text-[#8d5347] text-center mb-6">
          Ceremony Seating Arrangement
        </h1>

        {/* Guest List */}
        <div className="bg-white p-4 rounded-lg shadow-md w-64 mx-auto mb-6">
          <h3 className="text-lg font-semibold mb-2 text-[#8d5347]">Guests</h3>
          <ul>
            {guests.map((guest, index) => (
              <li
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, guest)}
                className="p-2 bg-gray-200 rounded-md text-center cursor-pointer mb-2"
              >
                {guest}
              </li>
            ))}
          </ul>
        </div>

        {/* Seating Chart */}
        <div ref={pdfRef} className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-xl font-semibold mb-4 text-[#8d5347]">Ceremony Layout</h2>

          <div className="grid grid-cols-8 gap-2 justify-center">
            {seats.map((seat, index) => (
              <div
                key={index}
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={handleDragOver}
                className="w-10 h-10 flex items-center justify-center rounded-full border bg-gray-200 text-gray-700 text-sm"
              >
                {seat || index + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Export PDF Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={generatePDF}
            className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600"
          >
            Export as PDF
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SeatingChart;

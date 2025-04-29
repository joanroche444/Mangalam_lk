import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Navbar from "./Navbar";
import Footer from "./Footer";

const SeatingChart = () => {
  const { projectId } = useParams(); // Get projectId from URL
  const [seats, setSeats] = useState(Array(40).fill(null));
  const [guests, setGuests] = useState([]);
  const pdfRef = useRef(null);

  // 🧠 Backend APIs
  const fetchGuests = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/guests/${projectId}`);
      const data = await res.json();
      setGuests(data.map((g) => g.name)); // Assuming { name: 'Alice' } format
    } catch (err) {
      console.error("Error fetching guests:", err);
    }
  };

  const fetchSeating = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/seating/${projectId}`);
      const data = await res.json();
      const updated = Array(40).fill(null);
      data.forEach((s) => {
        updated[s.seatIndex] = s.guestName;
      });
      setSeats(updated);
    } catch (err) {
      console.error("Error fetching seating:", err);
    }
  };

  const assignSeat = async (index, guest) => {
    try {
      await fetch("http://localhost:5000/api/seating", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, seatIndex: index, guestName: guest }),
      });
    } catch (err) {
      console.error("Error assigning seat:", err);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchGuests();
      fetchSeating();
    }
  }, [projectId]);

  // 🔄 Drag and Drop Logic
  const handleDragStart = (event, guest) => {
    event.dataTransfer.setData("text/plain", guest);
  };

  const handleDrop = async (event, index) => {
    event.preventDefault();
    const guest = event.dataTransfer.getData("text/plain");

    if (seats.includes(guest)) {
      alert(`${guest} is already seated!`);
      return;
    }

    const updated = [...seats];
    updated[index] = guest;
    setSeats(updated);

    await assignSeat(index, guest);
  };

  const handleDragOver = (event) => event.preventDefault();

  const generatePDF = () => {
    if (!pdfRef.current) {
      alert("Seating chart is empty! Please arrange the seats first.");
      return;
    }

    setTimeout(() => {
      html2canvas(pdfRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: "#ffffff",
      })
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF();
          pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
          pdf.save("seating-chart.pdf");
        })
        .catch((err) => {
          console.error("Error generating PDF:", err);
          alert("There was an error generating the PDF.");
        });
    }, 1000);
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
          <h3 className="text-lg font-semibold mb-2 text-[#8d5347]">Guest List</h3>
          <ul>
            {guests.length > 0 ? (
              guests.map((guest, index) => (
                <li
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, guest)}
                  className="p-2 bg-gray-200 rounded-md text-center cursor-pointer mb-2"
                >
                  {guest}
                </li>
              ))
            ) : (
              <li className="text-gray-500">No guests available</li>
            )}
          </ul>
        </div>

        {/* Seating Chart */}
        <div
          ref={pdfRef}
          className="bg-white p-6 rounded-2xl shadow-md text-center"
        >
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

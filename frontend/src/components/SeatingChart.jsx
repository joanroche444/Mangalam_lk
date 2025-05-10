import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import * as htmlToImage from "html-to-image";
import { jsPDF } from "jspdf";
import Navbar from "./Navbar";
import Footer from "./Footer";

const SeatingChart = () => {
  const { projectId } = useParams();
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState("");
  const [seats, setSeats] = useState(Array(50).fill(null));
  const pdfRef = useRef(null);

  useEffect(() => {
    if (projectId) {
      fetchGuests();
      fetchSeating();
    }
  }, [projectId]);

  const fetchGuests = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/guests/${projectId}`);
      const data = await res.json();
      setGuests(data);
    } catch (err) {
      console.error("Error fetching guests:", err);
    }
  };

  const fetchSeating = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/seating/${projectId}`);
      const data = await res.json();
      const updated = Array(50).fill(null);
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

  const handleDragStart = (e, guest) => {
    e.dataTransfer.setData("text/plain", guest.name);
  };

  const handleDrop = async (e, index) => {
    e.preventDefault();
    const guestName = e.dataTransfer.getData("text/plain");

    if (seats.includes(guestName)) {
      alert(`${guestName} is already seated.`);
      return;
    }

    const updatedSeats = [...seats];
    updatedSeats[index] = guestName;
    setSeats(updatedSeats);
    await assignSeat(index, guestName);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleAddGuest = () => {
    if (!newGuest.trim()) return;
    const manualGuest = { name: newGuest, category: "Guest" };
    setGuests([...guests, manualGuest]);
    setNewGuest("");
  };

  const downloadAsImage = async () => {
    try {
      const dataUrl = await htmlToImage.toPng(pdfRef.current);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "seating_chart.png";
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  const downloadAsPDF = async () => {
    try {
      const dataUrl = await htmlToImage.toPng(pdfRef.current);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("seating_chart.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const tables = Array.from({ length: 12 }, (_, i) =>
    seats.slice(i * 3, i * 3 + 7)
  );

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(to bottom right, #fce7f3, #ede9fe)" }}
    >
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-semibold text-[#8d5347] text-center mb-6">
          Seating Arrangements
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Guest List */}
          <div className="bg-white p-4 rounded-lg shadow-md w-full lg:w-1/4">
            <h3 className="text-lg font-semibold mb-2 text-[#8d5347] text-center">
              Guest List
            </h3>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter guest name"
                className="w-full p-2 border rounded mb-2"
                value={newGuest}
                onChange={(e) => setNewGuest(e.target.value)}
              />
              <button
                onClick={handleAddGuest}
                className="w-full bg-[#8d5347] text-white py-1 rounded hover:bg-[#7b463b]"
              >
                Add Guest
              </button>
            </div>
            <ul>
              {guests.length > 0 ? (
                guests.map((guest, index) => (
                  <li
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, guest)}
                    className="p-2 mb-2 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-center"
                  >
                    <p className="font-semibold">{guest.name}</p>
                    <p className="text-sm text-gray-500">{guest.category}</p>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 text-center">No guests</li>
              )}
            </ul>
          </div>

          {/* Seating Layout */}
          <div
            className="w-full lg:w-3/4 bg-white p-6 rounded-xl shadow-md"
            ref={pdfRef}
          >
            <h2 className="text-xl font-bold text-[#8d5347] text-center mb-4">
              Table Layout
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {tables.map((tableSeats, tableIndex) => (
                <div
                  key={tableIndex}
                  className="bg-gray-100 rounded-lg p-4 flex flex-col items-center shadow-sm"
                >
                  <h4 className="font-semibold text-[#8d5347] mb-3">
                    Table {tableIndex + 1}
                  </h4>
                  <div className="flex flex-wrap justify-center gap-3">
                    {tableSeats.map((seat, seatOffset) => {
                      const seatIndex = tableIndex * 7 + seatOffset;
                      return (
                        <div
                          key={seatIndex}
                          onDrop={(e) => handleDrop(e, seatIndex)}
                          onDragOver={handleDragOver}
                          className="w-16 h-16 flex items-center justify-center border rounded-full bg-white hover:bg-gray-200 transition-colors text-sm text-center"
                        >
                          {seat || `Seat ${seatIndex + 1}`}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <button
                onClick={downloadAsImage}
                className="bg-[#8d5347] text-white px-4 py-2 rounded hover:bg-[#7b463b] transition mr-4"
              >
                Download Seating Chart as Image
              </button>
              <button
                onClick={downloadAsPDF}
                className="bg-[#8d5347] text-white px-4 py-2 rounded hover:bg-[#7b463b] transition"
              >
                Download Seating Chart as PDF
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SeatingChart;

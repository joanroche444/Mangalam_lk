import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Navbar from "./Navbar";
import Footer from "./Footer";

const SeatingChart = () => {
  const { projectId } = useParams();
  const [seats, setSeats] = useState(Array(50).fill(null));
  const [guests, setGuests] = useState([]);
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
      setGuests(data); // store full guest objects
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
    const guest = e.dataTransfer.getData("text/plain");

    if (seats.includes(guest)) {
      alert(`${guest} is already seated.`);
      return;
    }

    const updated = [...seats];
    updated[index] = guest;
    setSeats(updated);
    await assignSeat(index, guest);
  };

  const handleDragOver = (e) => e.preventDefault();

  const generateSeatingChartPDF = () => {
    if (!pdfRef.current) return;
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
          alert("Error generating the PDF.");
        });
    }, 500);
  };

  const generateGuestListPDF = () => {
    const doc = new jsPDF();
    doc.text("Guest List Report", 10, 10);
    guests.forEach((guest, index) => {
      doc.text(
        `${index + 1}. ${guest.name} (${guest.category}) - ${guest.contact}, ${guest.email}`,
        10,
        20 + index * 10
      );
    });
    doc.save("guest-list.pdf");
  };

  const tables = Array.from({ length: 12 }, (_, i) =>
    seats.slice(i * 3, i * 3 + 7)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
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

          {/* Tables Layout */}
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

            <div className="flex justify-center mt-6 gap-4 flex-wrap">
              <button
                onClick={generateSeatingChartPDF}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
              >
                Export Seating Chart
              </button>
              <button
                onClick={generateGuestListPDF}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                Export Guest List
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

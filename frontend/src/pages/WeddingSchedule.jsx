import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const MAX_SCHEDULES = 20;

const WeddingSchedule = () => {
  const { projectId } = useParams(); // Get dynamic project ID
  const navigate = useNavigate();  // Initialize navigate function
  const [itinerary, setItinerary] = useState([]);

  // Fetch schedules from the server
  const fetchSchedules = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/schedules/${projectId}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setItinerary(data);
      } else {
        setItinerary([]);
        console.error("Unexpected response:", data);
      }
    } catch (err) {
      console.error("Failed to fetch schedules:", err);
      setItinerary([]);
    }
  };

  // Save new schedule
  const saveSchedule = async (schedule) => {
    await fetch("http://localhost:5000/api/schedules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...schedule, projectId }),
    });
    fetchSchedules();
  };

  // Delete schedule
  const deleteSchedule = async (id) => {
    await fetch(`http://localhost:5000/api/schedules/${id}`, {
      method: "DELETE",
    });
    fetchSchedules();
  };

  useEffect(() => {
    if (projectId) {
      fetchSchedules();
    }
  }, [projectId]);

  const handleChange = (index, field, value) => {
    const updated = [...itinerary];
    updated[index][field] = value;
    setItinerary(updated);
  };

  const handleAdd = () => {
    if (itinerary.length >= MAX_SCHEDULES) {
      return alert("Max 20 schedules allowed.");
    }
    setItinerary([...itinerary, { time: "", event: "", duration: "" }]);
  };

  const handleDeleteLocal = (index) => {
    const item = itinerary[index];
    if (item._id) {
      deleteSchedule(item._id);
    } else {
      setItinerary(itinerary.filter((_, i) => i !== index));
    }
  };

  const handleSaveNew = async (index) => {
    const item = itinerary[index];
    if (!item.time || !item.event || !item.duration) {
      alert("Fill in all fields");
      return;
    }
    if (!item._id) {
      await saveSchedule(item);
    }
  };

  const generateReport = () => {
    if (!itinerary.length) {
      return alert("No schedules to export.");
    }

    const doc = new jsPDF();
    doc.text("Wedding Schedule Report", 10, 10);

    itinerary.forEach((item, index) => {
      doc.text(
        `${index + 1}. Time: ${item.time}, Event: ${item.event}, Duration: ${item.duration}`,
        10,
        20 + index * 10
      );
    });

    doc.save("wedding_schedule.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 to-purple-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="p-6 w-full">
          <h2 className="text-3xl mb-4 font-semibold text-[#8d5347] text-center">
            Event Schedule
          </h2>
          <div className="space-y-4">
            {itinerary.map((item, index) => (
              <div key={index} className="p-4 shadow-md rounded-2xl bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Time"
                    value={item.time}
                    onChange={(e) => handleChange(index, "time", e.target.value)}
                    className="w-1/3 p-2 border rounded text-black"
                  />
                  <input
                    type="text"
                    placeholder="Event"
                    value={item.event}
                    onChange={(e) => handleChange(index, "event", e.target.value)}
                    className="w-1/3 p-2 border rounded text-black"
                  />
                  <input
                    type="text"
                    placeholder="Duration"
                    value={item.duration}
                    onChange={(e) => handleChange(index, "duration", e.target.value)}
                    className="w-1/3 p-2 border rounded text-black"
                  />
                  <button
                    onClick={() => handleSaveNew(index)}
                    className="ml-2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleDeleteLocal(index)}
                    className="ml-2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAdd}
              className="text-[#b06a5d] border-[#b06a5d] border px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-[#8d5347]"
            >
              Add New Schedule
            </button>
            <button
              onClick={generateReport}
              className="text-[#b06a5d] border-[#b06a5d] border px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-[#8d5347]"
            >
              Generate Report
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default WeddingSchedule;

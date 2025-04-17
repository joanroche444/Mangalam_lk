import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

const MAX_SCHEDULES = 20;

const WeddingSchedule = () => {
    const [itinerary, setItinerary] = useState([{ time: '', event: '', duration: '' }]);

    const handleChange = (index, field, value) => {
        const updatedItinerary = [...itinerary];
        updatedItinerary[index] = { ...updatedItinerary[index], [field]: value };
        setItinerary(updatedItinerary);
    };

    const validate = () => {
        return itinerary.some(item => item.time.trim() && item.event.trim() && item.duration.trim());
    };

    const generateReport = () => {
        if (!validate()) {
            alert('Please add at least one valid schedule before generating the report.');
            return;
        }
        const doc = new jsPDF();
        doc.text('Wedding Schedule Report', 10, 10);

        itinerary.forEach((item, index) => {
            if (item.time.trim() && item.event.trim() && item.duration.trim()) {
                doc.text(`${index + 1}. Time: ${item.time}, Event: ${item.event}, Duration: ${item.duration}`, 10, 20 + index * 10);
            }
        });

        doc.save('wedding_schedule.pdf');
    };

    const addSchedule = () => {
        if (itinerary.length < MAX_SCHEDULES) {
            setItinerary([...itinerary, { time: '', event: '', duration: '' }]);
        } else {
            alert('You can only add up to 20 schedules.');
        }
    };

    const deleteSchedule = (index) => {
        setItinerary(itinerary.filter((_, idx) => idx !== index));
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 to-purple-100">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar />
                <main className="p-6 w-full">
                    <h2 className="text-3xl mb-4 font-semibold text-[#8d5347] text-center">Event Schedule</h2>
                    <div className="space-y-4">
                        {itinerary.map((item, index) => (
                            <div key={index} className="p-4 shadow-md rounded-2xl bg-white">
                                <div className="flex gap-2">
                                    <div className="w-1/3">
                                        <label className="block text-sm font-semibold text-[#8d5347]">Time</label>
                                        <input
                                            type="text"
                                            placeholder="Time"
                                            value={item.time}
                                            onChange={(e) => handleChange(index, 'time', e.target.value)}
                                            className="p-2 border rounded-md w-full text-black"
                                        />
                                    </div>
                                    <div className="w-1/3">
                                        <label className="block text-sm font-semibold text-[#8d5347]">Event</label>
                                        <input
                                            type="text"
                                            placeholder="Event"
                                            value={item.event}
                                            onChange={(e) => handleChange(index, 'event', e.target.value)}
                                            className="p-2 border rounded-md w-full text-black"
                                        />
                                    </div>
                                    <div className="w-1/3">
                                        <label className="block text-sm font-semibold text-[#8d5347]">Duration</label>
                                        <input
                                            type="text"
                                            placeholder="Duration"
                                            value={item.duration}
                                            onChange={(e) => handleChange(index, 'duration', e.target.value)}
                                            className="p-2 border rounded-md w-full text-black"
                                        />
                                    </div>
                                    <button
                                    onClick={() => deleteSchedule(index)}
                                     className="ml-2 px-2 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-700"
                                      >
                                       Delete
                                    </button>

                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-4 mt-4">
                        <button 
                            onClick={addSchedule} 
                            className="text-[#b06a5d] border-[#b06a5d] border px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-[#8d5347] focus:outline-none bg-transparent"
                        >
                            Add Another Schedule
                        </button>
                        <button 
                            onClick={generateReport} 
                            className="text-[#b06a5d] border-[#b06a5d] border px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-[#8d5347] focus:outline-none bg-transparent"
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

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { jsPDF } from "jspdf";

const GuestList = ({ projectId, onGuestAdded }) => {
  const [guests, setGuests] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    contact: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (projectId) fetchGuests();
  }, [projectId]);

  const fetchGuests = async () => {
    const res = await fetch(`http://localhost:5000/api/guests/${projectId}`);
    const data = await res.json();
    setGuests(data);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.contact.trim()) newErrors.contact = "Contact is required.";
    else if (!/^\d{10}$/.test(form.contact))
      newErrors.contact = "Contact must be 10 digits.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    if (!form.category) newErrors.category = "Category is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email is invalid.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddGuest = async () => {
    if (!validateForm()) return;

    const newGuest = { ...form, projectId };
    const res = await fetch("http://localhost:5000/api/guests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGuest),
    });

    const data = await res.json();
    setGuests([...guests, data]);
    setForm({ name: "", category: "Family", contact: "", email: "" });
    setErrors({});

    // For SeatingChart or other integration
    if (onGuestAdded) onGuestAdded(data);
  };

  const handleDeleteGuest = async (id) => {
    await fetch(`http://localhost:5000/api/guests/${id}`, {
      method: "DELETE",
    });
    setGuests(guests.filter((guest) => guest._id !== id));
  };

  const exportGuestListPDF = () => {
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center p-4 mb-60">
          <div className="w-full max-w-3xl p-5 bg-white shadow rounded-xl">
            <h2 className=" text-[#b06a5d] text-2xl font-bold mb-4 text-center">Create New Guest List</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="p-2 w-full border border-gray-300 rounded"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div>
                <select
                 value={form.category}
                 onChange={(e) => setForm({ ...form, category: e.target.value })}
                 className={`p-2 w-full border ${
                 errors.category ? "border-red-500" : "border-gray-300"
                } rounded`}
                >
                    <option value="">Select Category</option>
                    <option value="Family">Family</option>
                    <option value="VIP">VIP</option>
                    <option value="Friends">Friend</option>
                    <option value="Other">Other</option>
               </select>
               {errors.category && (
                 <p className="text-red-500 text-sm">{errors.category}</p>
                    )}
               </div>


              <div>
                <input
                  type="text"
                  placeholder="Contact"
                  value={form.contact}
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  className="p-2 w-full border border-gray-300 rounded"
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm">{errors.contact}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="p-2 w-full border border-gray-300 rounded"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="flex justify-center gap-4 mt-4 md:col-span-2">
          <button
           onClick={handleAddGuest}
           className="bg-[#b06a5d] text-white px-4 py-2 rounded hover:bg-[#9a5c4e] transition"
          >
             Add Guest
         </button>
        </div>

            </div>

            <div className="flex justify-center gap-4 mt-4 md:col-span-2">
            <button
           onClick={() => {
            if (guests.length === 0) {
            alert(" Cannot export. Please add at least one guest first.");
            } else {
            exportGuestListPDF();
           }
         }}
        className={`px-4 py-2 rounded text-white ${
        guests.length === 0
           ? "bg-gray-400 hover:bg-gray-500"
          : "bg-blue-500 hover:bg-blue-600"
           }`}
>
         Export Guest List
       </button>


            </div>

            <ul className="space-y-4">
              {guests.map((guest) => (
                <li
                  key={guest._id}
                  className="flex justify-between items-start border border-gray-200 rounded p-4 shadow-sm"
                >
                  <div>
                    <p className="font-semibold text-lg">{guest.name}</p>
                    <p className="text-sm text-gray-500">{guest.category}</p>
                    <p className="text-sm text-gray-600">{guest.email}</p>
                    <p className="text-sm text-gray-600">{guest.contact}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteGuest(guest._id)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
      <Footer/>
    </div>
  );
};

export default GuestList;
import { useEffect, useState } from "react";

const GuestList = ({ projectId }) => {
  const [guests, setGuests] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "Family",
    contact: "",
    email: "",
  });

  useEffect(() => {
    fetchGuests();
  }, [projectId]);

  const fetchGuests = async () => {
    const res = await fetch(`http://localhost:5000/api/guests/${projectId}`);
    const data = await res.json();
    setGuests(data);
  };

  const handleAddGuest = async () => {
    const newGuest = { ...form, projectId };
    const res = await fetch("http://localhost:5000/api/guests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGuest),
    });
    const data = await res.json();
    setGuests([...guests, data]);
    setForm({ name: "", category: "Family", contact: "", email: "" });
  };

  const handleDeleteGuest = async (id) => {
    await fetch(`http://localhost:5000/api/guests/${id}`, {
      method: "DELETE",
    });
    setGuests(guests.filter((guest) => guest._id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Guest List</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-2 border border-gray-300 rounded"
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="p-2 border border-gray-300 rounded"
        >
          <option>Family</option>
          <option>VIP</option>
          <option>Friends</option>
          <option>Other</option>
        </select>
        <input
          type="text"
          placeholder="Contact"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleAddGuest}
          className="col-span-1 md:col-span-2 bg-[#b06a5d] text-white py-2 rounded hover:bg-[#9a5c4e]"
        >
          Add Guest
        </button>
      </div>

      <ul className="space-y-2">
        {guests.map((guest) => (
          <li
            key={guest._id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <strong>{guest.name}</strong> ({guest.category})<br />
              <small>{guest.email} | {guest.contact}</small>
            </div>
            <button
              onClick={() => handleDeleteGuest(guest._id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuestList;

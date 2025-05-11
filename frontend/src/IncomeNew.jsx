import { useState } from "react";

export default function AddIncomeForm() {
  const [formData, setFormData] = useState({
    userId: "12344", // Static user ID
    icon: "",
    source: "",
    amount: "",
    date: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false); // To control modal visibility

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    // Validate source
    if (!formData.source.trim()) {
      newErrors.source = "Income source is required.";
    }

    // Validate amount
    if (!formData.amount.trim()) {
      newErrors.amount = "Amount is required.";
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Amount must be a positive number.";
    }

    // Validate date
    const currentDate = new Date().toISOString().split("T")[0];
    if (formData.date > currentDate) {
      newErrors.date = "Date cannot be in the future.";
    }

    // Validate icon (if provided)
    if (formData.icon && !/^https?:\/\/.+/i.test(formData.icon)) {
      newErrors.icon = "Please provide a valid URL for the icon.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const validationErrors = validateForm();
    setErrors(validationErrors);

    // If there are validation errors, stop form submission
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/income/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Income added successfully");
        setFormData({ userId: "12344", icon: "", source: "", amount: "", date: "" });
        setIsModalVisible(true); // Show the modal after successful submission
      } else {
        setMessage(data.message || "Error adding income");
      }
    } catch (error) {
      setMessage("Server error");
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/12954016/pexels-photo-12954016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}
    >
      <h1 className="text-5xl font-bold text-black text-center mb-6 cursor-pointer transition-all duration-1000 ease-in-out font-serif">
        Add Your Income
      </h1>

      <div className="bg-white bg-opacity-80 p-8 rounded-2xl shadow-lg w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 flex">
        <form onSubmit={handleSubmit} className="w-full flex">
          {/* Left side: Basic fields */}
          <div className="w-1/2 pr-6">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Income Source</label>
              <input
                type="text"
                name="source"
                value={formData.source}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.source ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBD4C8]`}
                placeholder="Enter income source"
                required
              />
              {errors.source && <p className="text-red-600 text-sm">{errors.source}</p>}
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBD4C8]`}
                placeholder="Enter amount"
                required
              />
              {errors.amount && <p className="text-red-600 text-sm">{errors.amount}</p>}
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBD4C8]`}
                required
              />
              {errors.date && <p className="text-red-600 text-sm">{errors.date}</p>}
            </div>
          </div>

          {/* Right side: Additional fields */}
          <div className="w-1/2 pl-6">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Icon URL (optional)</label>
              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.icon ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBD4C8]`}
                placeholder="Enter icon URL"
              />
              {errors.icon && <p className="text-red-600 text-sm">{errors.icon}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-[#b18c79] text-white py-3 rounded-lg hover:bg-[#D4B59A] transition"
            >
              Add Income
            </button>

            {message && <p className="text-black-600 text-sm mt-2">{message}</p>}
          </div>
        </form>
      </div>

      {/* Modal for success message */}
      {isModalVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-[#EBD4C8] bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
            <h2 className="text-2xl font-semibold text-green-600">Income Added Successfully!</h2>
            <p className="mt-4 text-gray-600">Your income has been successfully added to the system.</p>
            <button
              onClick={closeModal}
              className="mt-6 px-4 py-2 bg-[#b18c79] text-black rounded-lg hover:bg-[#ddc5b9]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState } from "react";

const AddService = () => {
  const [headerText, setHeaderText] = useState("Get started by adding your service below");
  const [formData, setFormData] = useState({
    service_name: "",
    service_type: "",
    description: "",
    what_we_provide: "",
    price: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State to manage error message
  const [priceError, setPriceError] = useState(""); // State to manage price error message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) {
      setErrorMessage(""); // Clear the error message when the user starts typing again
    }
    if (priceError) {
      setPriceError(""); // Clear price error if user changes the price field
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Price validation: Check if the price is a valid number and is not negative
    if (isNaN(formData.price) || formData.price < 0) {
      setPriceError("Price must be a valid number and cannot be negative.");
      return; // Stop the form submission if there's a price validation error
    }

    const dataToSend = {
      ...formData,
      email: "kasun3@gmail.com", // Static email
    };

    try {
      const response = await fetch("http://localhost:5000/api/vendor/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Service added successfully!");
      } else if (result.message === 'Service name already exists. Please choose another.') {
        setErrorMessage(result.message); // Set error message if the name exists
      } else {
        alert("Failed to add service.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://static.showit.co/1200/RgoQcOI2SoyQXHR6DTAM_A/121130/cp_1606.jpg')",
      }}
    >
      <h1
        className="text-5xl font-bold text-white text-center mb-6 cursor-pointer transition-all duration-1000 ease-in-out font-serif italic"
        onMouseEnter={() => setTimeout(() => setHeaderText("First step as a vendor"), 300)}
        onMouseLeave={() => setTimeout(() => setHeaderText("Get started by adding your service below"), 300)}
      >
        {headerText}
      </h1>

      <div className="mb-6"></div>
      <div className="bg-white bg-opacity-80 p-8 rounded-2xl shadow-lg w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 flex">
        {/* Form starts here */}
        <form onSubmit={handleSubmit} className="w-full flex">
          {/* Left side: Basic fields */}
          <div className="w-1/2 pr-6">
            <h2 className="text-2xl font-bold text-center mb-4 font-serif italic">Add Your Service</h2>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Service Name</label>
              <input
                type="text"
                name="service_name"
                value={formData.service_name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBD4C8]"
                placeholder="Enter your Service"
                required
              />
              {errorMessage && (
                <p className="text-red-600 text-sm mt-2">{errorMessage}</p> // Display error in red
              )}
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Service Type</label>
              <input
                type="text"
                name="service_type"
                value={formData.service_type}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBD4C8]"
                placeholder="Enter service type"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Service Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBD4C8]"
                placeholder="Enter service description"
                rows="4"
                required
              ></textarea>
            </div>
          </div>

          {/* Right side: Additional fields */}
          <div className="w-1/2 pl-6">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">What's Provided</label>
              <textarea
                name="what_we_provide"
                value={formData.what_we_provide}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBD4C8]"
                placeholder="List what's provided"
                rows="4"
                required
              ></textarea>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBD4C8]"
                placeholder="Enter the price"
                required
              />
              {priceError && (
                <p className="text-red-600 text-sm mt-2">{priceError}</p> // Display price error in red
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#EBD4C8] text-white py-3 rounded-lg hover:bg-[#D4B59A] transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddService;

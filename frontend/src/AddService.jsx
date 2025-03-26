import React, { useState } from "react";

const AddService = () => {
  const [headerText, setHeaderText] = useState("Get started by adding your service below");

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
        {/* Left side: Basic fields */}
        <div className="w-1/2 pr-6">
          <h2 className="text-2xl font-bold text-center mb-4 font-serif italic">Add Your Service</h2>
          <form>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBD4C8]"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Service Type</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBD4C8]"
                placeholder="Enter service type"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Service Description</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBD4C8]"
                placeholder="Enter service description"
                rows="4"
              ></textarea>
            </div>
          </form>
        </div>

        {/* Right side: Additional fields */}
        <div className="w-1/2 pl-6">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">What's Provided</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBD4C8]"
              placeholder="List what's provided"
              rows="4"
            ></textarea>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Price</label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBD4C8]"
              placeholder="Enter the price"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Service Images</label>
            <input
              type="file"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EBD4C8]"
              accept="image/*"
              multiple
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#EBD4C8] text-white py-3 rounded-lg hover:bg-[#D4B59A] transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddService;

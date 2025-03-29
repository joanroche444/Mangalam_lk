import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusCircle, FileText, Pencil,RefreshCcw, Trash2 } from "lucide-react";

const VendorDashboard = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/vendor/");
        if (!response.ok) {
          throw new Error("Failed to fetch vendors");
        }
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  const handleAddService = () => {
    window.location.href = "http://localhost:5173/AddService";
  };

  return (
    <div className="min-h-screen bg-[#EBD4C8] p-6 flex flex-col items-center">
      {/* Welcome Section */}
      <div className="relative w-full h-64 mb-8">
        <img
          src="https://cdn.guides4brides.co.uk/prod/crm/sites/guides_for_brides/page-title-and-imgs/85a6a1ad-8156-425b-a1b1-8a148c304bc2/wedding_reception_venue_thomas_william_unsplash_mobile_page-title-and-img.jpg"
          alt="Wedding Setting"
          className="w-full h-full object-cover rounded-lg opacity-70"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-black">Welcome to Mangalam, our valued vendor!</h1>
          <p className="text-lg text-black">We're thrilled to work with you.</p>
        </div>
      </div>

      {/* Add Service Section */}
      <div className="w-full max-w-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Add Services Here</h2>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-2xl shadow-lg cursor-pointer flex flex-col items-center"
          onClick={handleAddService}
        >
          <PlusCircle className="w-12 h-12 text-[#A85D50]" />
          <p className="mt-2 text-lg font-semibold">Add Service</p>
        </motion.div>
      </div>

      {/* Vendor & Services List */}
      <div className="w-full max-w-7xl mx-auto px-10 py-12">
  <h2 className="text-3xl font-semibold text-gray-800 mb-12 text-center">My Services!!</h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
    {vendors.length === 0 ? (
      <p className="text-center text-lg text-gray-600">No vendors available</p>
    ) : (
      vendors.map((vendor) => (
        <motion.div
          key={vendor.email}
          className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-between space-y-6"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-[#A85D50]">{vendor.name}</h3>
            <p className="text-gray-600 text-lg mb-2">{vendor.service_type}</p>
            <p className="text-gray-700 text-base">{vendor.description}</p>
          </div>
          <div>
            <p className="text-xl font-bold text-[#A85D50] mb-2">Rs. {vendor.price}</p>
            <p className="text-gray-600">{vendor.what_we_provide}</p>
          </div>
          <div className="flex justify-between items-center gap-8">
            <button className="text-[#A85D50] hover:text-blue-700 transition">
              <Pencil className="w-8 h-8" />
            </button>
            
            <button className="text-[#A85D50] hover:text-red-700 transition">
              <Trash2 className="w-8 h-8" />
            </button>
          </div>
        </motion.div>
      ))
    )}
  </div>
</div>



      {/* Generate Report Button */}
      <motion.div whileHover={{ scale: 1.1 }} className="fixed bottom-6 right-6">
        <button className="bg-[#A85D50] text-white px-6 py-3 rounded-full shadow-md flex items-center gap-2">
          <FileText className="w-5 h-5" /> Generate Report
        </button>
      </motion.div>
    </div>
  );
};

export default VendorDashboard;

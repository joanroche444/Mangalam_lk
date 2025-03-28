import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, FileText } from "lucide-react";

const VendorDashboard = () => {
  const [services, setServices] = useState([
    { id: 1, name: "Floral Arrangements" },
    { id: 2, name: "Photography & Videography" },
    { id: 3, name: "Catering & Cake Design" },
  ]);

  const handleAddService = () => {
    window.location.href = "http://localhost:5173/AddService";
  };

  return (
    <div className="min-h-screen bg-[#EBD4C8] p-0 flex flex-col items-center">
      {/* Welcome Section with Background Image */}
      <div className="relative w-full h-64 mb-8">
        <img 
          src="https://cdn.guides4brides.co.uk/prod/crm/sites/guides_for_brides/page-title-and-imgs/85a6a1ad-8156-425b-a1b1-8a148c304bc2/wedding_reception_venue_thomas_william_unsplash_mobile_page-title-and-img.jpg" 
          alt="Wedding Setting" 
          className="w-full h-full object-cover rounded-lg opacity-70"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-black"> welcome to Mangalam, our valued vendor!</h1>
          <p className="text-lg text-black">We're thrilled to work with you.</p>
        </div>
      </div>
      
      {/* Add Service Section */}
      <div className="w-full max-w-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Add Services Here</h2>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#FFFFFF] p-6 rounded-2xl shadow-lg cursor-pointer flex flex-col items-center"
          onClick={handleAddService}
        >
          <PlusCircle className="w-12 h-12 text-[#A85D50]" />
          <p className="mt-2 text-lg font-semibold">Add Service</p>
        </motion.div>
      </div>

      {/* My Services Section */}
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">My Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white p-4 rounded-2xl shadow-md text-center">
                <p className="text-lg font-medium">{service.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Generate Report Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6"
      >
        <button className="bg-[#A85D50] text-white px-6 py-3 rounded-full shadow-md flex items-center gap-2">
          <FileText className="w-5 h-5" /> Generate Report
        </button>
      </motion.div>
    </div>
  );
};

export default VendorDashboard;

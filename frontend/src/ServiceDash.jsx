import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusCircle, FileText, Pencil, Trash2 } from "lucide-react";

const VendorDashboard = () => {
  const [vendors, setVendors] = useState([]);
  const [textIndex, setTextIndex] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // State for confirmation modal
  const [vendorToDelete, setVendorToDelete] = useState(null); // Store vendor info to delete
  const texts = [
    "Welcome to Mangalam, our valued vendor!",
    "We are excited to collaborate with you.",
    "Let's make great things happen together!",
    "We are thrilled to work with you!"
  ];

  const serviceImages = {
    "Catering": "https://i.pinimg.com/236x/56/1d/f0/561df0ddacb3d0ddd77ef4dfa6226c9f.jpg",
    "Venue": "https://i.pinimg.com/736x/3f/1c/cd/3f1ccd79c55ba5a9355fcd41e64bd533.jpg",
    "Photography/Videography": "https://i.pinimg.com/736x/cd/eb/8b/cdeb8befdcb36284c5475074c0dbee5a.jpg",
    "Cake": "https://i.pinimg.com/736x/70/b0/e4/70b0e482f566d1753c27c745454f5dd2.jpg",
    "cake": "https://i.pinimg.com/736x/8e/3d/98/8e3d984233bb8dcec1607ff8ca5f65a4.jpg",
    "Decoration": "https://i.pinimg.com/736x/da/92/79/da92799e45c17445d4cd7ae75b66d195.jpg",
    "default": "https://i.pinimg.com/736x/f3/4d/2b/f34d2bc33c132f07d8e18265d24a78ec.jpg",
  };

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

  // Change text every 6 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length); // Cycles through texts
    }, 6000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const handleAddService = () => {
    window.location.href = "http://localhost:5173/AddService";
  };

  const handleConfirmDelete = (vendor) => {
    setVendorToDelete(vendor); // Set the vendor to be deleted
    setShowConfirmModal(true); // Show the confirmation modal
  };

  const handleDeleteVendor = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/vendor/remove/${vendorToDelete._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setVendors((prevVendors) => prevVendors.filter((vendor) => vendor._id !== vendorToDelete._id));
        setShowConfirmModal(false); // Close modal after deletion
      }
    } catch (error) {
      console.error("Error deleting vendor:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#EBD4C8] p-0 flex flex-col items-center">
      {/* Welcome Section */}
      <div className="relative w-full h-64 mb-8">
        <img
          src="https://cdn.guides4brides.co.uk/prod/crm/sites/guides_for_brides/page-title-and-imgs/85a6a1ad-8156-425b-a1b1-8a148c304bc2/wedding_reception_venue_thomas_william_unsplash_mobile_page-title-and-img.jpg"
          alt="Wedding Setting"
          className="w-full h-full object-cover rounded-lg opacity-70"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.h1
            key={textIndex}
            className="text-4xl font-bold text-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {texts[textIndex]}
          </motion.h1>
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
            vendors.map((vendor) => {
              const backgroundImage = serviceImages[vendor.service_type] || ""; // Default to empty string if no image

              return (
                <motion.div
                  key={vendor.email}
                  className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-between space-y-6"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-[#A85D50]">{vendor.name}</h3>
                    <p className="text-black-600 font-bold font-serif italic text-lg mb-2">{vendor.service_type}</p>
                    <p className="text-black-700 ont-bold font-serif italic text-base">{vendor.description}</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-black mb-2">Rs. {vendor.price}</p>
                    <p className="text-black-600 font-bold font-serif italic">{vendor.what_we_provide}</p>
                  </div>
                  <div className="flex justify-between items-center gap-8">
                    <button className="text-[#A85D50] hover:text-blue-700 transition">
                      <Pencil className="w-8 h-8" />
                    </button>

                    <button
                      className="text-[#A85D50] hover:text-red-700 transition"
                      onClick={() => handleConfirmDelete(vendor)} // Show confirmation modal on icon click
                    >
                      <Trash2 className="w-8 h-8" />
                    </button>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 bg-gray-400">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center">
            <h3 className="text-2xl font-semibold text-red-600">Are you sure?</h3>
            <p className="text-lg">You are about to delete {vendorToDelete.name}. This action cannot be undone.</p>
            <div className="flex justify-around mt-4">
              <button
                onClick={() => setShowConfirmModal(false)} // Close modal
                className="bg-gray-500 text-white px-6 py-2 rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteVendor} // Proceed with deletion
                className="bg-red-500 text-white px-6 py-2 rounded-full"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Generate Report Button */}
    
    </div>
  );
};

export default VendorDashboard;

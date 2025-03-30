import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Footer from "../Component/Footer";
import Navbar from "../Component/Navbar";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    "Discover services tailored to your needs and elevate your experience.",
    "Your perfect service awaits—explore and find the best fit for you.",
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/vendor/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();

    const messageInterval = setInterval(() => {
      setCurrentMessage((prevMessage) => (prevMessage + 1) % messages.length);
    }, 7000);

    return () => clearInterval(messageInterval);
  }, []);

  const defaultImage =
    "https://i.pinimg.com/736x/f3/4d/2b/f34d2bc33c132f07d8e18265d24a78ec.jpg"; // Default image for all cards
  const cakeImage =
    "https://i.pinimg.com/736x/70/b0/e4/70b0e482f566d1753c27c745454f5dd2.jpg"; // Image for "Cake" service type
  const cateringImage =
    "https://i.pinimg.com/236x/56/1d/f0/561df0ddacb3d0ddd77ef4dfa6226c9f.jpg"; // Image for "Catering" service type
  const venueImage =
    "https://i.pinimg.com/736x/bd/b2/b3/bdb2b3175179ba0534979f0608f8997c.jpg"; // Image for "Venue" service type
  const photographyImage =
    "https://i.pinimg.com/736x/cd/eb/8b/cdeb8befdcb36284c5475074c0dbee5a.jpg"; // Image for "Photography/Videography" service type
  const decorationImage =
    "https://i.pinimg.com/236x/70/1f/a1/701fa14c523d80dee83bbfdeca92ba2c.jpg"; // Image for "Decoration" service type

  return (
    <div>
      <Navbar />
    <div className="flex flex-col items-center justify-center bg-[#EBD4C8] min-h-screen">
      {/* Image Section with Rotating Messages */}
      <div className="relative w-full h-[50vh]">
        <img
          src="/service1.jpg"
          alt="Service 1"
          className="w-full h-full object-cover object-bottom opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1
            key={currentMessage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl font-italic font-bold font-serif italic text-white text-center"
          >
            {messages[currentMessage]}
          </motion.h1>
        </div>
      </div>

      {/* Heading */}
      <h2 className="text-4xl font-bold font-serif italic my-8 text-gray-800">Our Services</h2>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => {
          // Set the image based on the service type
          let backgroundImage;

          switch (service.service_type) {
            case "Catering":
              backgroundImage = cateringImage;
              break;
            case "Venue":
              backgroundImage = venueImage;
              break;
            case "Photography/Videography":
              backgroundImage = photographyImage;
              break;
            case "Cake":
              backgroundImage = cakeImage;
              break;
            case "Decoration":
              backgroundImage = decorationImage;
              break;
            default:
              backgroundImage = defaultImage;
          }

          // Convert price to rupees (Assume the price is in USD, for example)
          const priceInRupees = service.price * 200; // Replace 200 with actual conversion rate if needed

          return (
            <motion.div
              key={service._id}
              className="group relative rounded-lg group-hover:bg-opacity-30 shadow-lg p-6 w-80 h-80 flex flex-col justify-between overflow-hidden"
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{
                backgroundImage: `url(${backgroundImage})`, // Conditionally set background image
                backgroundSize: "cover",
                backgroundPosition: "center",
                
              }}
            >
              {/* Overlay for Readability with opacity change on hover */}
              <div className="absolute inset-0 bg-opacity-50 group-hover:bg-opacity-30 transition-all p-6 flex flex-col justify-center items-center text-center">
                <h3 className="text-3xl font-semibold  font-serif italic mb-2 text-black">{service.service_name}</h3>
                <p className="text-lg font-semibold  font-serif italic text-black mb-4">{service.service_type}</p>
                <p className="text-black-200 font-bold font-serif italic mb-4">{service.description}</p>
                <p className="text-2xl font-bold font-serif italic mb-2 text-black">{`Rs${priceInRupees}`}</p>
                <p className="text-black-200 font-bold font-serif italic">{service.what_we_provide}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default AllServices;

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './vendor.css'; // Ensure this CSS file imports the 'Dancing Script' font

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [currentMessage, setCurrentMessage] = useState(0);
  const messages = [
    "Discover services tailored to your needs and elevate your experience.",
    "Your perfect service awaits—explore and find the best fit for you."
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/vendor/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();

    const messageInterval = setInterval(() => {
      setCurrentMessage((prevMessage) => (prevMessage + 1) % messages.length);
    }, 7000); // Change message every 7 seconds

    return () => clearInterval(messageInterval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-[#EBD4C8]">
      {/* Image Section with Rotating Messages */}
      <div className="relative w-full h-[50vh]">
        {/* Background Image */}
        <img
          src="/service1.jpg" // Ensure this path is correct
          alt="Service 1"
          className="w-full h-full object-cover object-bottom opacity-80"
        />
        {/* Overlay Text */}
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
      <h2 className="text-4xl font-bold my-8 text-gray-800">Our Services</h2>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <motion.div
            key={service._id}
            className="bg-white rounded-lg shadow-lg p-6 w-80 h-80 flex flex-col justify-between"
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">{service.service_name}</h3>
              <p className="text-gray-600 mb-2">{service.service_type}</p>
              <p className="text-gray-700 mb-4">{service.description}</p>
            </div>
            <div>
              <p className="text-lg font-bold mb-2 text-gray-800">${service.price}</p>
              <p className="text-gray-600">{service.what_we_provide}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllServices;


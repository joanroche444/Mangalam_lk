import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const themes = [
  {
    id: 1,
    name: "Classic & Elegant",
    description: "Timeless sophistication with grand venues and refined decor.",
    images: [
      "/classic1.jpg",
      "/classic3.webp",
      "/classic4.jpg",
      "/classic5.avif"
    ],
    options: [
      "Grand Ballrooms, Luxury Hotels, Historic Venues",
      "Elegant White & Gold Color Palette",
      "Live Classical Music or String Quartet",
    ],
    services: [
      "Full Wedding Planning & Coordination",
      "Five-Course Fine Dining & Wine Pairing",
      "Luxury Transportation (Limos, Vintage Cars)",
    ],
  },
  {
    id: 2,
    name: "Rustic & Bohemian",
    description: "Nature-inspired, intimate weddings with earthy tones.",
    images: [
      "/rustic2.jpg",
      "/rustic3.jpg",
      "/rustic4.jpg",
      "/rustic5.jpeg"
    ],
    options: [
      "Outdoor Barns, Gardens, Vineyards, Beaches",
      "Casual & Relaxed Dress Code",
      "String Lights & Candles for Warm Ambiance",
    ],
    services: [
      "Farm-to-Table Catering with Organic Food",
      "Acoustic Music, Folk Bands, or Solo Guitarists",
      "Open Seating Arrangement with Family-Style Dining",
    ],
  },
  {
    id: 3,
    name: "Destination & Beach Wedding",
    description: "Relaxed tropical weddings with ocean views and sunset ceremonies.",
    images: [
      "/beach2.jpeg",
      "/beach3.webp",
      "/beach4.jpg",
      "/beach5.webp"
    ],
    options: [
      "Beach Resorts, Private Islands, Luxury Villas",
      "Light & Breezy Wedding Attire",
      "Oceanfront Ceremony with Sunset Backdrop",
    ],
    services: [
      "All-Inclusive Resort Wedding Packages",
      "Local Entertainment (Fire Dancers, Steel Drum Bands)",
      "Honeymoon Package Included in Wedding Plan",
    ],
  },
];

export default function ThemeDetails() {
  const { id } = useParams();
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const selectedTheme = themes.find((t) => t.id === parseInt(id));
    setTheme(selectedTheme);
  }, [id]);

  if (!theme) {
    return <div className="text-center mt-10 text-red-500">Theme not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto flex-1">
        <h1 className="text-4xl font-bold text-center text-[#b06a5d] mb-6">{theme.name}</h1>

        <div className="mt-4 flex gap-6 justify-center flex-wrap">
          {theme.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${theme.name} ${index + 1}`}
              className="w-80 h-60 object-cover rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
            />
          ))}
        </div>

        <p className="text-lg mt-6 text-center text-[#8d5347]">{theme.description}</p>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-center text-[#8d5347] mb-4">Options</h2>
          <ul className="list-disc list-inside text-center space-y-2">
            {theme.options.map((option, index) => (
              <li key={index} className="text-gray-700 hover:text-[#b06a5d]">{option}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-center text-[#8d5347] mb-4">Services</h2>
          <ul className="list-disc list-inside text-center space-y-2">
            {theme.services.map((service, index) => (
              <li key={index} className="text-gray-700 hover:text-[#b06a5d]">{service}</li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
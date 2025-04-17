import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Card from "../components/Card";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WeddingSlider from "../components/ImageSlider";

const dummyProjects = [
  {
    id: 1,
    name: "John & Jane's Wedding",
    image: "/couple 1.jpg",
  },
  {
    id: 2,
    name: "Alice & Bob's Wedding",
    image: "/couple 2.jpg",
  },
];

const themes = [
  {
    id: 1,
    name: "Classic & Elegant",
    description: "Timeless sophistication with grand venues and refined decor.",
    image: "/classic2.avif",
    route: "/themes/classic",
  },
  {
    id: 2,
    name: "Rustic & Bohemian",
    description: "Nature-inspired, intimate weddings with earthy tones.",
    image: "/rustic1.jpg",
    route: "/themes/rustic",
  },
  {
    id: 3,
    name: "Destination & Beach Wedding",
    description: "Relaxed tropical weddings with ocean views and sunset ceremonies.",
    image: "/beach1.jpg",
    route: "/themes/destination",
  },
];

export default function WeddingDashboard() {
  const [projects, setProjects] = useState(dummyProjects);
  const navigate = useNavigate(); // Hook for navigation

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this wedding project?");
    if (confirmDelete) {
      setProjects(projects.filter((project) => project.id !== id));
    }
  };

  const handleEdit = (id) => {
    // Navigate to the create wedding project page and pass project data as state
    navigate("/create-wedding-project", { state: { projectId: id } });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-6 w-full">
        <WeddingSlider />

        <div className="p-6 w-full">
          <h1 className="text-5xl font-bold mb-8 text-center text-[#b06a5d]">Wedding Planning Dashboard</h1>

          <div className="mb-8 text-center">
            <h2 className="text-4xl mb-4 font-semibold text-[#8d5347]">Wedding Themes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover various wedding themes that reflect your style! Whether you prefer a classic and elegant setting or a relaxed beach ceremony, we have the perfect options for your big day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {themes.map((theme) => (
              <div key={theme.id} className="p-5 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all">
                <img src={theme.image} alt={theme.name} className="w-full h-52 object-cover rounded-lg mb-4 hover:scale-105" />
                <h3 className="text-xl font-semibold text-center text-[#8d5347]">{theme.name}</h3>
                <p className="text-gray-700 text-center mt-2">{theme.description}</p>
                <div className="flex justify-center mt-4">
                  <Link to={`/themes/${theme.id}`}>
                    <Button className="!text-[#b06a5d] border-[#b06a5d] border px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-[#8d5347] focus:outline-none bg-transparent">Read More</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center my-10">
            <Link to="/create-wedding-project">
              <Button className="!text-[#b06a5d] border-[#b06a5d] border px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-[#8d5347] focus:outline-none bg-transparent">
                Create New Wedding Project
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card
                key={project.id}
                project={project}
                onEdit={handleEdit} // Pass handleEdit to Card
                onDelete={handleDelete} // Pass handleDelete to Card
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

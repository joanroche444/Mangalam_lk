import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WeddingSlider from "../components/ImageSlider";

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
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  // 🔧 Inline API Helpers
  const fetchProjects = async () => {
    const res = await fetch("http://localhost:5000/api/projects");
    const data = await res.json();
    setProjects(data);
  };

  const deleteProject = async (id) => {
    await fetch(`http://localhost:5000/api/projects/${id}`, {
      method: "DELETE",
    });
    fetchProjects(); // refresh
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = (id) => {
    navigate("/create-wedding-project", { state: { projectId: id } });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteProject(id);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6 w-full">
        <WeddingSlider />

        <div className="p-6 w-full">
          <h1 className="text-5xl font-bold mb-8 text-center text-[#b06a5d]">
            Wedding Planning Dashboard
          </h1>

          {/* Wedding Themes Section */}
          <div className="mb-12 text-center">
            <h2 className="text-4xl mb-4 font-semibold text-[#8d5347]">Wedding Themes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover various wedding themes that reflect your style! Whether you prefer a classic and elegant setting or a relaxed beach ceremony, we have the perfect options for your big day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"> 
            {themes.map((theme) => (
              <div
                key={theme.id}
                className="p-5 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all"
              >
                <img
                  src={theme.image}
                  alt={theme.name}
                  className="w-full h-52 object-cover rounded-lg mb-4 hover:scale-105 transition-transform"
                />
                <h3 className="text-xl font-semibold text-center text-[#8d5347]">{theme.name}</h3>
                <p className="text-gray-700 text-center mt-2">{theme.description}</p>
                <div className="flex justify-center mt-4">
                  <Link to={`/themes/${theme.id}`}>
                    <Button className="!text-[#b06a5d] border-[#b06a5d] border px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-[#8d5347] focus:outline-none bg-transparent">
                      Read More
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Create New Project */}
          <div className="flex justify-center my-12">
            <Link to="/create-wedding-project">
              <Button className="!text-[#b06a5d] border-[#b06a5d] border px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-[#8d5347] focus:outline-none bg-transparent">
                Create New Wedding Project
              </Button>
            </Link>
          </div>

          {/* Existing Projects Section */}
          <h2 className="text-3xl font-semibold mb-4 text-[#8d5347] text-center">Your Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {projects.length === 0 ? (
              <p className="text-center col-span-full text-gray-600">No projects found.</p>
            ) : (
              projects.map((project) => (
                <Card
                  key={project._id}
                  project={project}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

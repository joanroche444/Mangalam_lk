import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Button from "../components/Button";

export default function CreateWeddingProject() {
  const location = useLocation();
  const navigate = useNavigate();
  const projectId = location.state?.projectId;

  const [projectDetails, setProjectDetails] = useState({
    name: "",
    date: "",
    venue: "",
    city: "",
    guests: 0,
    rooms: 0,
    theme: "",
    groomName: "",
    brideName: "",
    groomsmen: [],
    bridesmaids: [],
    otherCrew: [],
    image: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token) {
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [navigate, location.pathname]);
  
  // 🔧 Inline API Helpers
  const fetchProjectById = async (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user || !user.token) {
      alert("Please log in to view this project");
      navigate('/login');
      return;
    }
    
    try {
      const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch project');
      }
      
      const project = await res.json();
      setProjectDetails(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      alert("Failed to load project: " + error.message);
    }
  };

  const createProject = async (data) => {
    // Get the logged in user from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user || !user.token) {
      // Handle case where user is not logged in
      alert("Please log in to create a project");
      navigate('/login');
      return null;
    }
    
    // Add the userId to the project data
    const projectDataWithUser = {
      ...data,
      userId: user._id
    };
    
    try {
      const res = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}` // Add auth token
        },
        body: JSON.stringify(projectDataWithUser),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create project');
      }
      
      return await res.json();
    } catch (error) {
      console.error("Project creation error:", error);
      alert("Failed to create project: " + error.message);
      return null;
    }
  };
  

  const updateProject = async (id, data) => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user || !user.token) {
      alert("Please log in to update a project");
      navigate('/login');
      return;
    }
    
    try {
      const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update project');
      }
      
      return await res.json();
    } catch (error) {
      console.error("Project update error:", error);
      alert("Failed to update project: " + error.message);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchProjectById(projectId);
    }
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["groomsmen", "bridesmaids", "otherCrew"].includes(name)) {
      setProjectDetails((prev) => ({
        ...prev,
        [name]: value.split(",").map((v) => v.trim()).filter(Boolean),
      }));
    } else {
      setProjectDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (projectId) {
        await updateProject(projectId, projectDetails);
        navigate("/dashboard");
      } else {
        const newProject = await createProject(projectDetails);
        
        if (newProject && newProject._id) {
          const newProjectId = newProject._id;
          navigate(`/create-schedule/${newProjectId}`);
        }
      }
    } catch (error) {
      console.error("Error submitting project:", error);
      alert("There was an error processing your request.");
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="relative p-6 w-full">
  
          {/* Background Image with Blur */}
          <div className="absolute inset-0">
            <img
              src="/background.jpg"
              alt="Wedding"
              className="w-full h-full object-cover blur-sm"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
  
          {/* Form Overlay */}
          <div className="relative z-10 flex justify-center items-center min-h-[calc(100vh-100px)]">
          <form
              onSubmit={handleSubmit}
              className="backdrop-blur-md bg-white/10 p-10 rounded-xl shadow-lg w-full max-w-3xl space-y-6"
          >

              <h1 className="text-3xl font-semi bold text-[#b06a5d] text-center">
                {projectId ? "Edit Wedding Project" : "Create Wedding Project"}
              </h1>
  
              {/* Project Name & Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block font-semibold text-white">Project Name</label>
                  <input
                    type="text"
                    name="name"
                    value={projectDetails.name}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2 w-full"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="date" className="block font-semibold text-white">Wedding Date</label>
                  <input
                    type="date"
                    name="date"
                    value={projectDetails.date}
                    onChange={(e) => {
                      const selectedDate = new Date(e.target.value);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0); // Reset time
  
                      if (selectedDate <= today) {
                        alert("Please select a Valid Date.");
                        return;
                      }
                      handleChange(e);
                    }}
                    className="border border-gray-300 rounded p-2 w-full "
                    required
                  />
                </div>
              </div>
  
              {/* Venue & City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="venue" className="block font-semibold text-white">Venue</label>
                  <input
                    type="text"
                    name="venue"
                    value={projectDetails.venue}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2 w-full "
                    required
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block font-semibold text-white">City</label>
                  <input
                    type="text"
                    name="city"
                    value={projectDetails.city}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2 w-full "
                    required
                  />
                </div>
              </div>
  
              {/* Guests & Rooms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="guests" className="block font-semibold text-white">Number of Guests</label>
                  <input
                    type="number"
                    name="guests"
                    value={projectDetails.guests}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2 w-full "
                    required
                  />
                </div>
                <div>
                  <label htmlFor="rooms" className="block font-semibold text-white">Rooms Required</label>
                  <input
                    type="number"
                    name="rooms"
                    value={projectDetails.rooms}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2 w-full "
                    required
                  />
                </div>
              </div>
  
              {/* Theme */}
              <div>
                <label htmlFor="theme" className="block font-semibold text-white">Wedding Theme</label>
                <select
                  name="theme"
                  value={projectDetails.theme}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-2 w-full "
                  required
                >
                  <option value="">Select Theme</option>
                  <option value="Classic & Elegant">Classic & Elegant</option>
                  <option value="Rustic & Bohemian">Rustic & Bohemian</option>
                  <option value="Destination & Beach">Destination & Beach</option>
                </select>
              </div>
  
              {/* Bride & Groom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="groomName" className="block font-semibold text-white">Groom's Name</label>
                  <input
                    type="text"
                    name="groomName"
                    value={projectDetails.groomName}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2 w-full "
                  />
                </div>
                <div>
                  <label htmlFor="brideName" className="block font-semibold text-white">Bride's Name</label>
                  <input
                    type="text"
                    name="brideName"
                    value={projectDetails.brideName}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2 w-full "
                  />
                </div>
              </div>
  
              {/* Crew */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="groomsmen" className="block font-semibold text-white">Groomsmen (comma separated)</label>
                  <input
                    type="text"
                    name="groomsmen"
                    value={projectDetails.groomsmen.join(", ")}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2 w-full "
                  />
                </div>
                <div>
                  <label htmlFor="bridesmaids" className="block font-semibold text-white">Bridesmaids (comma separated)</label>
                  <input
                    type="text"
                    name="bridesmaids"
                    value={projectDetails.bridesmaids.join(", ")}
                    onChange={handleChange}
                    className="border border-gray-300 rounded p-2 w-full "
                  />
                </div>
              </div>
  
              <div>
                <label htmlFor="otherCrew" className="block font-semibold text-white">Other Crew (comma separated)</label>
                <input
                  type="text"
                  name="otherCrew"
                  value={projectDetails.otherCrew.join(", ")}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </div>
  
              <div className="text-center pt-4">

                  <Button
                    type="submit"
                    className="text-[#b06a5d] border-[#b06a5d] border px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-[#8d5347] focus:outline-none bg-transparent"
                  >
                    {projectId ? "Update Project" : "Create Project"}
                  </Button>

              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

}

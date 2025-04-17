import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Button from "../components/Button";

export default function CreateWeddingProject() {
  const initialDetails = {
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
  };

  const location = useLocation();
  const navigate = useNavigate();
  const projectId = location.state?.projectId; // Get the projectId passed in state

  const [projectDetails, setProjectDetails] = useState(initialDetails);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (projectId) {
      // Fetch project details by projectId or pre-fill form fields if it's an edit
      // Example: You might fetch data from an API or use dummy data for testing.
      console.log("Editing project with ID:", projectId);

      
      const existingProject = {
        name: "John & Jane's Wedding",
        date: "2025-06-15",
        venue: "Beach Resort",
        city: "Malibu",
        guests: 150,
        rooms: 50,
        theme: "Destination & Beach",
        groomName: "John",
        brideName: "Jane",
        groomsmen: ["Paul", "George", "Mark"],
        bridesmaids: ["Sarah", "Emily", "Lucy"],
        otherCrew: ["James", "Anna"],
      };
      setProjectDetails(existingProject);
    }
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "groomsmen" || name === "bridesmaids" || name === "otherCrew") {
      
      setProjectDetails((prev) => ({
        ...prev,
        [name]: value.split(",").map((item) => item.trim()).filter((item) => item !== ""),
      }));
    } else {
      setProjectDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(projectDetails).some((value) => value === "" || value === 0)) {
      alert("Please fill in all the fields before submitting.");
      return;
    }

    
    console.log(projectDetails);

    setSuccessMessage(projectId ? "Wedding project updated successfully!" : "Wedding project created successfully!");

    
    setTimeout(() => {
      setSuccessMessage("");
      navigate("/dashboard"); 
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="relative p-6 w-full">
          
          <div className="relative">
            <img
              src="/background.jpg"
              alt="Wedding"
              className="w-full h-200 object-cover rounded-lg blur-sm"
            />
            <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>

           <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
            <form onSubmit={handleSubmit} className="absolute inset-0 flex flex-col justify-center items-center gap-6 p-6">
              <h1 className="text-3xl font-bold text-[#b06a5d]">{projectId ? "Edit Wedding Project" : "Create Wedding Project"}</h1>
              <div className="grid gap-4 max-w-2xl w-full">
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-white">Project Name</label>
                    <input
                      type="text"
                      name="name"
                      value={projectDetails.name}
                      onChange={handleChange}
                      className="border p-2 border-white rounded w-full"
                      style={{ color: 'white' }}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-sm font-semibold text-white">Wedding Date</label>
                    <input
                      type="date"
                      name="date"
                      value={projectDetails.date}
                      onChange={handleChange}
                      className="border p-2 border-white rounded w-full"
                      style={{ color: 'white' }}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="venue" className="block text-sm font-semibold text-white">Venue</label>
                    <input
                      type="text"
                      name="venue"
                      value={projectDetails.venue}
                      onChange={handleChange}
                      className="border p-2 border-white rounded w-full"
                      style={{ color: 'white' }}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold text-white">City</label>
                    <input
                      type="text"
                      name="city"
                      value={projectDetails.city}
                      onChange={handleChange}
                      className="border p-2 border-white rounded w-full"
                      style={{ color: 'white' }}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="guests" className="block text-sm font-semibold text-white">Number of Guests</label>
                    <input
                      type="number"
                      name="guests"
                      value={projectDetails.guests}
                      onChange={handleChange}
                      className="border p-2 border-white rounded w-full"
                      style={{ color: 'white' }}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="rooms" className="block text-sm font-semibold text-white">Rooms Required</label>
                    <input
                      type="number"
                      name="rooms"
                      value={projectDetails.rooms}
                      onChange={handleChange}
                      className="border p-2 border-white rounded w-full"
                      style={{ color: 'white' }}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="theme" className="block text-sm font-semibold text-white">Wedding Theme</label>
                  <select
                    name="theme"
                    value={projectDetails.theme}
                    onChange={handleChange}
                    className="border p-2 border-white rounded w-full"
                    style={{ color: 'white' }}
                    required
                  >
                    <option value="Classic & Elegant" className="text-black">Classic & Elegant</option>
                    <option value="Rustic & Bohemian" className="text-black">Rustic & Bohemian</option>
                    <option value="Destination & Beach" className="text-black">Destination & Beach</option>
                  </select>
                </div>

                {/* Wedding Crew Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="groomName" className="block text-sm font-semibold text-white">Groom's Name</label>
                    <input
                      type="text"
                      name="groomName"
                      value={projectDetails.groomName}
                      onChange={handleChange}
                      className="border p-2 border-white rounded w-full"
                      style={{ color: 'white' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="brideName" className="block text-sm font-semibold text-white">Bride's Name</label>
                    <input
                      type="text"
                      name="brideName"
                      value={projectDetails.brideName}
                      onChange={handleChange}
                      className="border p-2 border-white rounded w-full"
                      style={{ color: 'white' }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="groomsmen" className="block text-sm font-semibold text-white">Groomsmen (comma separated)</label>
                    <input
                      type="text"
                      name="groomsmen"
                      value={projectDetails.groomsmen.join(", ")}
                      onChange={handleChange}
                      className="border p-2 border-white rounded w-full"
                      style={{ color: 'white' }}
                    />
                    <small className="text-white">Enter names separated by commas (e.g., John, Paul, George)</small>
                  </div>
                  <div>
                    <label htmlFor="bridesmaids" className="block text-sm font-semibold text-white">Bridesmaids (comma separated)</label>
                    <input
                      type="text"
                      name="bridesmaids"
                      value={projectDetails.bridesmaids.join(", ")}
                      onChange={handleChange}
                      className="border p-2 border-white rounded w-full"
                      style={{ color: 'white' }}
                    />
                    <small className="text-white">Enter names separated by commas (e.g., Sarah, Emma, Lily)</small>
                  </div>
                </div>

                <div>
                  <label htmlFor="otherCrew" className="block text-sm font-semibold text-white">Other Crew (comma separated)</label>
                  <input
                    type="text"
                    name="otherCrew"
                    value={projectDetails.otherCrew.join(", ")}
                    onChange={handleChange}
                    className="border p-2 border-white rounded w-full"
                    style={{ color: 'white' }}
                  />
                  <small className="text-white">Enter names separated by commas (e.g., James, Mike, Anna)</small>
                </div>

                <div className="flex justify-center mt-6">
                  <Button
                    type="submit"
                    className="text-[#b06a5d] border-[#b06a5d] border px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-[#8d5347] focus:outline-none bg-transparent"
                  >
                    {projectId ? "Update Project" : "Create Project"}
                  </Button>
                </div>
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
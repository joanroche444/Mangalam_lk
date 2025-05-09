export default function Sidebar() {
    return (
      <div className="w-64 min-h-screen bg-[#f9efe7] text-white p-4">
        <h2 className="text-lg  text-black font-bold mb-4">Wedding Planner</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="/dashboard" className="block p-2 rounded text-[#b06a5d] hover:text-[#8d5347] font-semibold transition duration-300">Dashboard</a>
            </li>
            <li>
              <a href="/create-wedding-project" className="block p-2 rounded text-[#b06a5d] hover:text-[#8d5347] font-semibold transition duration-300">Create New Project</a>
            </li>
            <li>
              <a href="/create-schedule/:projectId" className="block p-2 rounded text-[#b06a5d] hover:text-[#8d5347] font-semibold transition duration-300">Wedding Schedule</a>
            </li>
            <li>
              <a href="/guest-list" className="block p-2 rounded text-[#b06a5d] hover:text-[#8d5347] font-semibold transition duration-300">Guest List</a>
            </li>
            <li>
              <a href="/seating" className="block p-2 rounded text-[#b06a5d] hover:text-[#8d5347] font-semibold transition duration-300">Seating Arrangements</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
  
import React from 'react';
import Sidebar from '../Component/Sidebar';
import Navbar from '../Component/Navbar';

function VendorHome() {
  return (
    <div className="min-h-screen flex flex-col">
    

      {/* Main content area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 p-6">
          <h1 className="text-xl font-semibold">Plan your wedding here for a wedding planning to plan the only wedding</h1>
        </div>
      </div>
    </div>
  );
}

export default VendorHome;

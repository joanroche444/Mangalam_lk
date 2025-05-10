import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  ShoppingBag, 
  FileText, 
  Settings, 
  Bell, 
  Search, 
  LogOut, 
  Menu, 
  X,
  BarChart,
  TrendingUp,
  DollarSign,
  ShoppingCart
} from 'lucide-react';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Sample data for dashboard stats
  const stats = [
    { title: "Total Sales", value: "$12,426", icon: <DollarSign className="h-6 w-6" />, change: "+12%", changeType: "positive" },
    { title: "New Users", value: "2,356", icon: <Users className="h-6 w-6" />, change: "+5%", changeType: "positive" },
    { title: "Orders", value: "487", icon: <ShoppingCart className="h-6 w-6" />, change: "-2%", changeType: "negative" },
    { title: "Conversions", value: "3.24%", icon: <TrendingUp className="h-6 w-6" />, change: "+7%", changeType: "positive" },
  ];

  // Sample data for recent orders
  const recentOrders = [
    { id: "#ORD-0012", customer: "John Smith", product: "Premium Plan", date: "May 8, 2025", status: "Completed", amount: "$129.99" },
    { id: "#ORD-0011", customer: "Sarah Jones", product: "Basic Plan", date: "May 8, 2025", status: "Processing", amount: "$49.99" },
    { id: "#ORD-0010", customer: "Michael Brown", product: "Premium Plan", date: "May 7, 2025", status: "Completed", amount: "$129.99" },
    { id: "#ORD-0009", customer: "Emily Davis", product: "Enterprise Plan", date: "May 7, 2025", status: "Completed", amount: "$299.99" },
    { id: "#ORD-0008", customer: "David Wilson", product: "Basic Plan", date: "May 6, 2025", status: "Cancelled", amount: "$49.99" },
  ];

  // Toggle sidebar visibility for mobile view
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Render status badge with appropriate color
  const renderStatusBadge = (status) => {
    const statusStyles = {
      Completed: "bg-green-100 text-green-800",
      Processing: "bg-blue-100 text-blue-800",
      Cancelled: "bg-red-100 text-red-800",
      Pending: "bg-yellow-100 text-yellow-800"
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status] || "bg-gray-100 text-gray-800"}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
          <div className="flex items-center flex-shrink-0 px-4">
            <span className="text-xl font-semibold">Admin Portal</span>
          </div>
          <div className="flex flex-col flex-grow px-4 mt-5">
            <nav className="flex-1 space-y-1">
              <a href="#" className="flex items-center px-2 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-700 group">
                <Home className="w-5 h-5 mr-3" />
                Dashboard
              </a>
              <a href="#" className="flex items-center px-2 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 group">
                <Users className="w-5 h-5 mr-3 text-gray-500" />
                Users
              </a>
              <a href="#" className="flex items-center px-2 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 group">
                <ShoppingBag className="w-5 h-5 mr-3 text-gray-500" />
                Products
              </a>
              <a href="#" className="flex items-center px-2 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 group">
                <FileText className="w-5 h-5 mr-3 text-gray-500" />
                Reports
              </a>
              <a href="#" className="flex items-center px-2 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 group">
                <Settings className="w-5 h-5 mr-3 text-gray-500" />
                Settings
              </a>
            </nav>
          </div>
          <div className="p-4 mt-auto border-t">
            <a href="#" className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 group">
              <LogOut className="w-5 h-5 mr-3 text-gray-500" />
              Sign out
            </a>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className={`md:hidden fixed inset-0 z-40 flex ${sidebarOpen ? 'visible' : 'invisible'}`}>
        {/* Overlay */}
        <div 
          className={`fixed inset-0 bg-gray-600 ${sidebarOpen ? 'opacity-75 visible' : 'opacity-0 invisible'} transition-opacity duration-300 ease-in-out`} 
          onClick={toggleSidebar}
        ></div>
        
        {/* Sidebar */}
        <div className={`relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <div className="absolute top-0 right-0 p-1 -mr-14">
            <button
              className={`flex items-center justify-center w-12 h-12 rounded-full focus:outline-none focus:bg-gray-600 ${sidebarOpen ? 'visible' : 'invisible'}`}
              onClick={toggleSidebar}
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
          
          <div className="flex items-center flex-shrink-0 px-4">
            <span className="text-xl font-semibold">Admin Portal</span>
          </div>
          <div className="flex flex-col flex-grow mt-5 overflow-y-auto">
            <nav className="flex-1 px-2 space-y-1">
              <a href="#" className="flex items-center px-2 py-2 text-base font-medium rounded-md bg-blue-50 text-blue-700 group">
                <Home className="w-5 h-5 mr-3" />
                Dashboard
              </a>
              <a href="#" className="flex items-center px-2 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 group">
                <Users className="w-5 h-5 mr-3 text-gray-500" />
                Users
              </a>
              <a href="#" className="flex items-center px-2 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 group">
                <ShoppingBag className="w-5 h-5 mr-3 text-gray-500" />
                Products
              </a>
              <a href="#" className="flex items-center px-2 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 group">
                <FileText className="w-5 h-5 mr-3 text-gray-500" />
                Reports
              </a>
              <a href="#" className="flex items-center px-2 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 group">
                <Settings className="w-5 h-5 mr-3 text-gray-500" />
                Settings
              </a>
            </nav>
          </div>
          <div className="p-4 mt-auto border-t">
            <a href="#" className="flex items-center text-base font-medium text-gray-700 hover:text-gray-900 group">
              <LogOut className="w-5 h-5 mr-3 text-gray-500" />
              Sign out
            </a>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navbar */}
        <div className="flex flex-shrink-0 h-16 bg-white border-b">
          <button
            className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1">
              <div className="flex w-full items-center md:ml-0">
                <div className="relative w-full max-w-xs text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    id="search"
                    className="block w-full h-full py-2 pl-10 pr-3 text-gray-900 placeholder-gray-500 border-transparent rounded-md focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center ml-4 md:ml-6">
              <button className="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Bell className="w-6 h-6" />
              </button>

              {/* Profile dropdown */}
              <div className="relative ml-3">
                <div>
                  <button className="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <img
                      className="w-8 h-8 rounded-full"
                      src="/api/placeholder/32/32"
                      alt="User profile"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <div className="px-4 sm:px-0">
            <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
            <p className="mt-2 text-sm text-gray-700">
              A summary of your account activity and business performance.
            </p>
          </div>

          {/* Stats overview */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="bg-blue-50 p-3 rounded-md">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">{stat.title}</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                          <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                            stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stat.change}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts section */}
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Sales Overview</h3>
                  <div className="flex space-x-3">
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-500">Weekly</button>
                    <button className="text-sm font-medium text-gray-500 hover:text-gray-700">Monthly</button>
                    <button className="text-sm font-medium text-gray-500 hover:text-gray-700">Yearly</button>
                  </div>
                </div>
                <div className="mt-6 h-60 flex items-center justify-center text-gray-500">
                  <BarChart className="h-10 w-10" />
                  <span className="ml-2">Chart visualization goes here</span>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">User Activity</h3>
                  <div className="flex space-x-3">
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-500">Weekly</button>
                    <button className="text-sm font-medium text-gray-500 hover:text-gray-700">Monthly</button>
                    <button className="text-sm font-medium text-gray-500 hover:text-gray-700">Yearly</button>
                  </div>
                </div>
                <div className="mt-6 h-60 flex items-center justify-center text-gray-500">
                  <BarChart className="h-10 w-10" />
                  <span className="ml-2">Chart visualization goes here</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent orders */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                View all
              </a>
            </div>
            <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.customer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {order.product}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {order.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {renderStatusBadge(order.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
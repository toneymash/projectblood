import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaCalendarAlt, FaHeartbeat, FaUsers, FaGift, FaBell, FaBook, FaHeadset, FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/5 bg-white p-4 shadow-md flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-red-600 flex items-center gap-2">
            BloodLife{" "}
            <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
              Donor Prof
            </span>
          </h2>
          <nav className="mt-4">
            <ul>
              <li className="flex items-center p-2 bg-red-500 text-white rounded cursor-pointer" onClick={() => handleNavigation("/pages/dashboard")}>
                <FaTachometerAlt className="mr-2" /> Dashboard
              </li>
              <li className="flex items-center p-2 mt-2 cursor-pointer" onClick={() => handleNavigation("/donation-schedule")}>
                <FaCalendarAlt className="mr-2" /> Donation Schedule
              </li>
              <li className="flex items-center p-2 cursor-pointer" onClick={() => handleNavigation("/health-info")}>
                <FaHeartbeat className="mr-2" /> Health Info
              </li>
              <li className="flex items-center p-2 cursor-pointer" onClick={() => handleNavigation("/community")}>
                <FaUsers className="mr-2" /> Community
              </li>
              <li className="flex items-center p-2 cursor-pointer" onClick={() => handleNavigation("/rewards")}>
                <FaGift className="mr-2" /> Rewards
              </li>
              <li className="flex items-center p-2 cursor-pointer" onClick={() => handleNavigation("/alerts")}>
                <FaBell className="mr-2" /> Alerts
              </li>
              <li className="flex items-center p-2 cursor-pointer" onClick={() => handleNavigation("/education")}>
                <FaBook className="mr-2" /> Education
              </li>
              <li className="flex items-center p-2 cursor-pointer" onClick={() => handleNavigation("/support")}>
                <FaHeadset className="mr-2" /> Support
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-auto">
          <button className="flex items-center p-2 text-red-600 hover:text-red-800 cursor-pointer w-full justify-start" onClick={handleSignOut}>
            <FaSignOutAlt className="mr-2" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button className="bg-red-500 text-white px-4 py-2 rounded">Schedule a Donation</button>
        </header>

        {/* Upcoming Appointments */}
        <section className="bg-white p-4 rounded shadow-md mt-4">
          <h2 className="text-lg font-bold">Upcoming Appointments</h2>
          <div className="mt-2 p-2 border rounded">
            <h3 className="font-bold">Whole Blood Donation</h3>
            <p className="text-sm text-gray-600">2025-04-18 at 10:00 AM</p>
            <p className="text-sm">Central Blood Bank</p>
            <p className="text-sm">123 Medical Center Dr, City, State 12345</p>
            <button className="mt-2 bg-red-500 text-white px-3 py-1 rounded text-sm">Reschedule</button>
            <button className="ml-2 border px-3 py-1 rounded text-sm">Cancel</button>
          </div>
        </section>

        {/* Donation Impact & History */}
        <div className="flex mt-4 gap-4">
          {/* Donation Impact */}
          <section className="bg-white p-4 rounded shadow-md w-1/3">
            <h2 className="text-lg font-bold">Your Impact</h2>
            <p className="text-xl font-bold text-red-600">Total Donations: 15</p>
            <p className="text-xl font-bold text-red-600">Lives Saved: 45</p>
            <p className="text-lg font-bold">Blood Type: <span className="text-red-600">O+</span></p>
          </section>

          {/* Donation History */}
          <section className="bg-white p-4 rounded shadow-md flex-1">
            <h2 className="text-lg font-bold">Donation History</h2>
            <table className="w-full mt-2 border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Date</th>
                  <th className="p-2">Location</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2">2025-01-15</td>
                  <td className="p-2">Central Blood Bank</td>
                  <td className="p-2">Whole Blood</td>
                  <td className="p-2 text-green-600">Completed</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">2024-10-20</td>
                  <td className="p-2">City Hospital</td>
                  <td className="p-2">Plasma</td>
                  <td className="p-2 text-green-600">Completed</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  HeartPulse,
  MessageCircle,
  AlertTriangle,
  Gift,
  LifeBuoy,
  Building2,
} from "lucide-react";
import { FaUserFriends, FaHandHoldingHeart, FaDonate } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Dummy data for donations (replace with API data if necessary)
const donationData = [
  { month: "Jan", donations: 20 },
  { month: "Feb", donations: 35 },
  { month: "Mar", donations: 50 },
  { month: "Apr", donations: 75 },
  { month: "May", donations: 100 },
  { month: "Jun", donations: 90 },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { key: "home", label: "Home", icon: <LayoutDashboard size={18} /> },
    { key: "requests", label: "Requests", icon: <Building2 size={18} /> },
    { key: "donations", label: "Donations", icon: <HeartPulse size={18} /> },
    { key: "education", label: "Education", icon: <BookOpen size={18} /> },
    { key: "support", label: "Support", icon: <LifeBuoy size={18} /> },
    { key: "health", label: "Health Info", icon: <Users size={18} /> },
    { key: "community", label: "Community", icon: <MessageCircle size={18} /> },
    { key: "alerts", label: "Alerts", icon: <AlertTriangle size={18} /> },
    { key: "rewards", label: "Rewards", icon: <Gift size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 p-6">
      <h1 className="text-4xl font-extrabold text-center text-red-600 mb-8 drop-shadow-sm">
        Admin Dashboard
      </h1>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {tabs.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-sm text-sm font-medium transition-all duration-300 ${activeTab === key
              ? "bg-red-500 text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-red-100"
              }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-4xl mx-auto animate-fadeIn">
        {activeTab === "home" && <Home />}
        {activeTab === "requests" && <BloodRequests />}
        {/* Add other sections like Donations, Education, etc., if needed */}
      </div>
    </div>
  );
};

// Home Page
const Home = () => (
  <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
    <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <StatCard
        title="Active Users"
        value="123"
        icon={<FaUserFriends className="text-blue-600 text-3xl" />}
        bg="bg-blue-100"
        color="text-blue-700"
      />
      <StatCard
        title="Active Donors"
        value="58"
        icon={<FaHandHoldingHeart className="text-green-600 text-3xl" />}
        bg="bg-green-100"
        color="text-green-700"
      />
      <StatCard
        title="Total Donations"
        value="231"
        icon={<FaDonate className="text-red-600 text-3xl" />}
        bg="bg-red-100"
        color="text-red-700"
      />
    </div>

    {/* Donation Trend Chart */}
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Donations Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={donationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="donations" stroke="#ef4444" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

// Blood Requests Page
const BloodRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:4000/api/requests");
        const data = await response.json();
        setRequests(data);
      } catch (err) {
        setError("Failed to load requests.");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const updateRequest = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:4000/api/requests/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      const updatedRequest = await response.json();
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? updatedRequest : request
        )
      );
    } catch (err) {
      setError("Failed to update the request.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-semibold text-red-600 mb-4">Blood Requests</h2>
      {loading ? (
        <p>Loading requests...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {requests.map((request) => (
            <li key={request.id} className="mb-4 p-4 border-b">
              <p>Hospital: {request.hospitalName}</p>
              <p>Blood Type: {request.bloodType}</p>
              <p>Urgency: {request.urgency}</p>
              <button
                onClick={() => updateRequest(request.id, "completed")}
                className="text-blue-500 hover:underline"
              >
                Mark as Completed
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Reusable Stat Card component
const StatCard = ({ title, value, icon, bg, color }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition-shadow duration-300">
    <div className={`${bg} p-4 rounded-full`}>
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  </div>
);

export default AdminDashboard;

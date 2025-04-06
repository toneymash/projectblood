import React from 'react';
import { FaUserFriends, FaHandHoldingHeart, FaDonate } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Dummy chart data (replace with API data if needed)
const donationData = [
    { month: 'Jan', donations: 20 },
    { month: 'Feb', donations: 35 },
    { month: 'Mar', donations: 50 },
    { month: 'Apr', donations: 75 },
    { month: 'May', donations: 100 },
    { month: 'Jun', donations: 90 },
];

function Home() {
    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

            {/* Stats Grid */}
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
}

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

export default Home;

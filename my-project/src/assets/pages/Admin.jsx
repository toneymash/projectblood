import { useState } from "react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("requests");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
      
      <div className="flex space-x-4 justify-center mb-6">
        {[
          "Requests", "Donations", "Education", "Support", "Health Info", "Community", "Alerts"
        ].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md ${activeTab === tab.toLowerCase() ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
            onClick={() => setActiveTab(tab.toLowerCase())}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        {activeTab === "requests" && <BloodRequests />}
        {activeTab === "donations" && <Donations />}
        {activeTab === "education" && <Education />}
        {activeTab === "support" && <Support />}
        {activeTab === "health info" && <HealthInfo />}
        {activeTab === "community" && <Community />}
        {activeTab === "alerts" && <Alerts />}
      </div>
    </div>
  );
};

const BloodRequests = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Blood Requests</h2>
    <p>Manage incoming blood requests from hospitals.</p>
  </div>
);

const Donations = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Donations</h2>
    <p>View and manage scheduled donations.</p>
  </div>
);

const Education = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Education</h2>
    <p>Manage educational content on blood donation.</p>
  </div>
);

const Support = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Support</h2>
    <p>Handle user inquiries and support requests.</p>
  </div>
);

const HealthInfo = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Health Information</h2>
    <p>Provide and update health-related information.</p>
  </div>
);

const Community = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Community</h2>
    <p>Manage community discussions and events.</p>
  </div>
);

const Alerts = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Alerts</h2>
    <p>Send emergency alerts for urgent blood donations.</p>
  </div>
);

export default AdminDashboard;

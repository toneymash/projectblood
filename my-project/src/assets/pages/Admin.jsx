import { useState } from "react";
import {
  LayoutDashboard, Users, BookOpen, HeartPulse, MessageCircle, AlertTriangle, Gift, LifeBuoy, Building2
} from "lucide-react";

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
    { key: "rewards", label: "Rewards", icon: <Gift size={18} /> }
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
        {activeTab === "donations" && <Donations />}
        {activeTab === "education" && <Education />}
        {activeTab === "support" && <Support />}
        {activeTab === "health" && <HealthInfo />}
        {activeTab === "community" && <Community />}
        {activeTab === "alerts" && <Alerts />}
        {activeTab === "rewards" && <Rewards />}
      </div>
    </div>
  );
};

// Reusable card layout
const SectionCard = ({ title, children }) => (
  <div>
    <h2 className="text-2xl font-semibold text-red-600 mb-4">{title}</h2>
    <div className="p-4 bg-red-50 rounded-lg border border-red-100 shadow-inner text-gray-800">
      {children}
    </div>
  </div>
);

const Home = () => (
  <SectionCard title="Home Overview">
    <p className="mb-2">Update dashboard metrics like:</p>
    <ul className="list-disc list-inside space-y-1">
      <li>✅ Lives Saved</li>
      <li>✅ Active Donors</li>
      <li>✅ Total Donations</li>
    </ul>
  </SectionCard>
);

const BloodRequests = () => (
  <SectionCard title="Blood Requests">
    <p>Manage incoming blood requests from hospitals with details like blood type, urgency, and hospital name.</p>
  </SectionCard>
);

const Donations = () => (
  <SectionCard title="Donations">
    <p>View and manage donor appointments and scheduled donations.</p>
  </SectionCard>
);

const Education = () => (
  <SectionCard title="Education Content">
    <p>Publish and manage informational posts on the importance of blood donation and donor eligibility.</p>
  </SectionCard>
);

const Support = () => (
  <SectionCard title="Support Center">
    <p>Resolve queries, respond to FAQs, and provide live support to users.</p>
  </SectionCard>
);

const HealthInfo = () => (
  <SectionCard title="Health Info">
    <p>Update wellness guidelines and pre-donation preparation resources.</p>
  </SectionCard>
);

const Community = () => (
  <SectionCard title="Community">
    <p>Manage events, forums, and user-driven initiatives to spread awareness.</p>
  </SectionCard>
);

const Alerts = () => (
  <SectionCard title="Emergency Alerts">
    <p>Send alerts for urgent blood needs and critical shortages to nearby donors.</p>
  </SectionCard>
);

const Rewards = () => (
  <SectionCard title="Rewards">
    <p>Manage donor badges, milestone achievements, and redemption offers.</p>
  </SectionCard>
);

export default AdminDashboard;

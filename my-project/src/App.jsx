import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import TeamSection from './components/TeamSection';
import Login from './components/login';
import Settings from './components/setting';
import Register from './components/Register';
import Dashboard from './assets/pages/Dashboard';
import DonationSchedule from "./assets/pages/DonationSchedule";
import HealthInfo from "./assets/pages/HealthInfo";
import Community from './assets/pages/Community';
import Rewards from "./assets/pages/Rewards";
import Alerts from "./assets/pages/Alerts";
import Education from "./assets/pages/Education";
import Support from "./assets/pages/Support";
import AdminDashboard from './assets/pages/Admin';
import HospitalRequestForm from './assets/pages/Hospital request';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/team" element={<TeamSection />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/donation-schedule" element={<DonationSchedule />} />
        <Route path="/health-info" element={<HealthInfo />} />
        <Route path="/community" element={<Community />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/education" element={<Education />} />
        <Route path="/support" element={<Support />} />
        <Route path="/hospital" element={<HospitalRequestForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

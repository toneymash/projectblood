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
import ContactUs from './components/ContactUs';
import ProtectedRoute from './components/ProtectedRoute';

// ✅ Add import for admin Home
import AdminHome from './admin/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/team" element={<TeamSection />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/contactus" element={<ContactUs />} />

        {/* 🔐 Protected user routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/donation-schedule" element={
          <ProtectedRoute>
            <DonationSchedule />
          </ProtectedRoute>
        } />
        <Route path="/health-info" element={
          <ProtectedRoute>
            <HealthInfo />
          </ProtectedRoute>
        } />
        <Route path="/community" element={
          <ProtectedRoute>
            <Community />
          </ProtectedRoute>
        } />
        <Route path="/rewards" element={
          <ProtectedRoute>
            <Rewards />
          </ProtectedRoute>
        } />
        <Route path="/alerts" element={
          <ProtectedRoute>
            <Alerts />
          </ProtectedRoute>
        } />
        <Route path="/education" element={
          <ProtectedRoute>
            <Education />
          </ProtectedRoute>
        } />
        <Route path="/support" element={
          <ProtectedRoute>
            <Support />
          </ProtectedRoute>
        } />
        <Route path="/hospital" element={
          <ProtectedRoute>
            <HospitalRequestForm />
          </ProtectedRoute>
        } />

        {/* 🔐 Admin-only route */}
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />

        {/* ✅ New Admin Home Route */}
        <Route path="/admin/home" element={
          <ProtectedRoute requiredRole="admin">
            <AdminHome />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import TeamSection from './components/TeamSection';
import Login from './components/login';
import Settings from './components/setting';
import Register from './components/Register';





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<TeamSection />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
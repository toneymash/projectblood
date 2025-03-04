import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Bell,
  Settings,
  LogOut,
  Heart,
  UserPlus,
  UserMinus,
  Activity,
  FileText,
  MessageCircle,
  HelpCircle,
  Download
} from 'lucide-react'
import { LineChart, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Bar } from 'recharts'

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 200 },
  { name: 'Group D', value: 150 }
];

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const DocCard = ({ title, description, icon: Icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
    <div className="flex items-start space-x-4">
      <div className="p-3 bg-blue-50 rounded-full">
        <Icon className="w-6 h-6 text-blue-500" />
      </div>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-600 mt-1 text-sm">{description}</p>
        <button className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium">
          Learn more →
        </button>
      </div>
    </div>
  </div>
);

function Home() {
  const navigate = useNavigate();

  const handleNavClick = (name) => {
    switch(name) {
      case 'Our Team':
        navigate('/team');
        break;
      case 'Sign Out':
        navigate('/login');
        break;
        case 'Settings':
        navigate('/settings');
        break;
       
        
      case 'Home':
        navigate('/');
        break;
      default:
        break;
    }
  };

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <div className='w-64 bg-white border-r p-4'>
        <div className='flex items-center space-x-2 mb-6'>
          <div className='w-8 h-8 bg-blue-600 rounded-lg'></div>
          <span className='text-red-700 text-xl font-bold flex items-center'>
            Saves Life <Heart className='ml-2 text-red-500' fill='currentColor' />
          </span>
        </div>
        <nav className='space-y-2'>
          {[{ name: 'Home', icon: LayoutDashboard },
            { name: 'Our Team', icon: Users },
            { name: 'Notifications', icon: Bell },
            { name: 'Contact Us', icon: MessageCircle },
            { name: 'Settings', icon: Settings },
            { name: 'Sign Out', icon: LogOut }].map((item, index) => (
            <div 
              key={index} 
              onClick={() => handleNavClick(item.name)}
              className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${index === 0 ? 'bg-red-100 text-red-700' : 'text-gray-600 hover:bg-red-100 hover:text-red-700'}`}
            >
              <item.icon className='w-5 h-5' />
              <span>{item.name}</span>
            </div>
          ))}
        </nav>
      </div>
      <div className='flex-1'>
        <div className='flex justify-between items-center p-8 bg-white'>
          <h1 className='text-2xl font-bold text-red-800'>Dashboard</h1>
          <div><span className='text-red-700 text-xl font-bold flex items-center'>
            Donate<Heart className='ml-2 text-red-500' fill='currentColor' />
          </span></div>
          <div className='flex items-center space-x-4'>
            <select className='border rounded p-1'>
              <option>Eng (US)</option>
              <option>French (FR)</option>
              <option>Swahili (SW)</option>
            </select>
            <div className='w-8 h-8 bg-gray-300 rounded-full' />
            <div className='flex space-x-2'>
              <Link to="/login" className='text-blue-600 hover:bg-blue-50 px-3 py-1 rounded transition-colors duration-200'>
                Login
              </Link>
              <Link to="/register" className='text-blue-600 hover:bg-blue-50 px-3 py-1 rounded transition-colors duration-200'>
                Sign Up
              </Link>
            </div>
          </div>
        </div>
        <div className='p-8'>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard title="Total Users" value="2,543" icon={Users} color="bg-blue-500" />
            <StatCard title="New Users" value="145" icon={UserPlus} color="bg-green-500" />
            <StatCard title="Active Users" value="1,873" icon={Activity} color="bg-purple-500" />
            <StatCard title="Inactive Users" value="670" icon={UserMinus} color="bg-red-500" />
          </div>
          <div className='grid grid-cols-2 gap-4 mb-8'>
            <LineChart width={500} height={300} data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
            <BarChart width={500} height={300} data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Documentation & Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <DocCard title="Our mission" description="is to save lives by ensuring a steady, safe, and sufficient blood supply for those in need." icon={FileText} />
              <DocCard title="Our vision" description=" is to create a world where no life is lost due to a lack of blood." icon={HelpCircle} />
              <DocCard title="Downloads" description="Download user reports, analytics data, and other resources." icon={Download} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Bell, Heart, MessageCircle, FileText, HelpCircle, Download } from 'lucide-react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const images = [
  '/images/1.jpg',
  '/images/2.jpg',
  '/images/3.jpg',
  '/images/4.jpg',
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
            { name: 'Contact Us', icon: MessageCircle }].map((item, index) => (
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
            <button 
              className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition'
              onClick={() => navigate('/hospital')}
            >
              Hospital Requests
            </button>
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
          <div className="mb-8">
            <Carousel showThumbs={false} autoPlay infiniteLoop>
              {images.map((src, index) => (
                <div key={index}>
                  <img src={src} alt={`Beneficiary ${index + 1}`} className="w-64 h-80 object-cover rounded-lg shadow-md mx-auto" />
                </div>
              ))}
            </Carousel>
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
  );
}

export default Home;
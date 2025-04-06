import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Bell,
  Heart,
  MessageCircle,
  FileText,
  HelpCircle,
  Download,
  Calendar,
  MapPin,
  Droplet,
  Clock,
  ChevronRight,
  Award,
  Check
} from 'lucide-react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const images = [
  '/images/1.jpg',
  '/images/2.jpg',
  '/images/3.jpg',
  '/images/4.jpg',
];

const bloodTypes = [
  { type: 'A+', canDonateTo: ['A+', 'AB+'], canReceiveFrom: ['A+', 'A-', 'O+', 'O-'] },
  { type: 'A-', canDonateTo: ['A+', 'A-', 'AB+', 'AB-'], canReceiveFrom: ['A-', 'O-'] },
  { type: 'B+', canDonateTo: ['B+', 'AB+'], canReceiveFrom: ['B+', 'B-', 'O+', 'O-'] },
  { type: 'B-', canDonateTo: ['B+', 'B-', 'AB+', 'AB-'], canReceiveFrom: ['B-', 'O-'] },
  { type: 'AB+', canDonateTo: ['AB+'], canReceiveFrom: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  { type: 'AB-', canDonateTo: ['AB+', 'AB-'], canReceiveFrom: ['A-', 'B-', 'AB-', 'O-'] },
  { type: 'O+', canDonateTo: ['A+', 'B+', 'AB+', 'O+'], canReceiveFrom: ['O+', 'O-'] },
  { type: 'O-', canDonateTo: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], canReceiveFrom: ['O-'] },
];

const upcomingEvents = [
  { date: 'May 10', location: 'Central Hospital', address: '123 Main St', slots: '15 slots available' },
  { date: 'May 15', location: 'Community Center', address: '456 Park Ave', slots: '8 slots available' },
  { date: 'May 22', location: 'University Campus', address: '789 College Blvd', slots: '20 slots available' },
];

const testimonials = [
  { name: 'Sarah Johnson', image: '/images/testimonial1.jpg', text: 'Thanks to blood donors, I survived a complicated surgery after my accident. You truly save lives!' },
  { name: 'Michael Chen', image: '/images/testimonial2.jpg', text: 'Regular transfusions help me manage my condition. Every donor makes a difference in my life.' },
  { name: 'Emma Rodriguez', image: '/images/testimonial3.jpg', text: 'My daughter needed blood after birth. I\'m forever grateful to the donors who made it possible for her to thrive.' },
];

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
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

const BloodTypeCard = ({ type, selected, onClick }) => (
  <div
    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selected ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'}`}
    onClick={() => onClick(type)}
  >
    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-2">
      <span className="text-xl font-bold text-red-600">{type.type}</span>
    </div>
    <p className="text-center font-medium">{type.type}</p>
  </div>
);

function Home() {
  const navigate = useNavigate();
  const [selectedBloodType, setSelectedBloodType] = useState(null);

  const handleNavClick = (name) => {
    switch (name) {
      case 'Our Team':
        navigate('/team');
        break;
      case 'Home':
        navigate('/');
        break;
      case 'ContactUs':
        navigate('/contactus'); // ✔️ This will show your beautiful ContactUs page
        break;
      case 'Hospital Requests':
        navigate('/hospital');
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-4 shadow-sm">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <Droplet className="w-5 h-5 text-white" />
          </div>
          <span className="text-red-700 text-xl font-bold flex items-center">
            Saves Life <Heart className="ml-2 text-red-500" fill="currentColor" />
          </span>
        </div>
        <nav className="space-y-2">
          {[
            { name: 'Home', icon: LayoutDashboard },
            { name: 'Our Team', icon: Users },
            { name: 'Notifications', icon: Bell },
            { name: 'Contact Us', icon: MessageCircle },
            { name: 'Hospital Requests', icon: FileText }
          ].map((item, index) => (
            <div
              key={index}
              onClick={() => handleNavClick(item.name)}
              className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${index === 0 ? 'bg-red-100 text-red-700' : 'text-gray-600 hover:bg-red-100 hover:text-red-700'
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </div>
          ))}
        </nav>

        <div className="mt-8 p-4 bg-red-50 rounded-lg border border-red-100">
          <h3 className="font-medium text-red-800 mb-2">Need Help?</h3>
          <p className="text-sm text-gray-600 mb-3">Have questions about donating blood? Our team is here to help.</p>
          <button className="w-full bg-red-600 text-white text-sm py-2 px-3 rounded hover:bg-red-700 transition">
            Contact Support
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-white shadow-sm sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-red-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition flex items-center"
              onClick={() => navigate('/donate')}
            >
              <Heart className="w-4 h-4 mr-2" /> Donate Now
            </button>
            <div className="flex space-x-2">
              <Link to="/login" className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded transition-colors duration-200">
                Login
              </Link>
              <Link to="/register" className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded transition-colors duration-200">
                Sign Up
              </Link>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-8 mb-8 shadow-md">
            <div className="md:flex items-center justify-between">
              <div className="md:w-2/3">
                <h1 className="text-3xl font-bold mb-4">Your Donation Makes a Difference</h1>
                <p className="text-xl mb-6">One donation can save up to three lives. Be a hero today.</p>
                <div className="flex space-x-4">
                  <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition shadow">
                    Donate Now
                  </button>
                  <button className="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition">
                    Learn More
                  </button>
                </div>
              </div>
              <div className="md:w-1/3 mt-6 md:mt-0 flex justify-center">
                <div className="w-32 h-32 bg-white rounded-full p-2">
                  <div className="w-full h-full bg-red-100 rounded-full flex items-center justify-center">
                    <Heart className="w-16 h-16 text-red-500" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard title="Lives Saved" value="27,843" icon={Heart} color="bg-red-500" />
            <StatCard title="Active Donors" value="5,271" icon={Users} color="bg-blue-500" />
            <StatCard title="Donations This Month" value="842" icon={Droplet} color="bg-green-500" />
            <StatCard title="Partner Hospitals" value="124" icon={FileText} color="bg-purple-500" />
          </div>

          {/* Urgent Needs Section */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500 mb-8">
            <h2 className="text-xl font-bold mb-3 flex items-center">
              <Bell className="mr-2 text-red-500" /> Urgent Blood Needs
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['O-', 'A+', 'B-', 'AB+'].map((type, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold text-red-600">{type}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                    <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${[30, 45, 20, 60][index]}%` }}></div>
                  </div>
                  <p className="text-sm text-gray-600">{[30, 45, 20, 60][index]}% of need met</p>
                </div>
              ))}
            </div>
            <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
              Donate Now
            </button>
          </div>

          {/* Blood Type Compatibility */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4">Blood Type Compatibility</h2>
            <p className="text-gray-600 mb-4">Select your blood type to see compatibility information:</p>

            <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mb-6">
              {bloodTypes.map((type) => (
                <BloodTypeCard
                  key={type.type}
                  type={type}
                  selected={selectedBloodType?.type === type.type}
                  onClick={setSelectedBloodType}
                />
              ))}
            </div>

            {selectedBloodType && (
              <div className="border-t pt-4">
                <div className="md:flex space-y-4 md:space-y-0 md:space-x-6">
                  <div className="md:w-1/2 p-4 bg-red-50 rounded-lg">
                    <h3 className="font-medium text-lg mb-2">{selectedBloodType.type} can donate to:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedBloodType.canDonateTo.map((type) => (
                        <span key={type} className="px-3 py-1 bg-white border border-red-200 rounded-full text-red-700">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="md:w-1/2 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-lg mb-2">{selectedBloodType.type} can receive from:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedBloodType.canReceiveFrom.map((type) => (
                        <span key={type} className="px-3 py-1 bg-white border border-blue-200 rounded-full text-blue-700">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Donation Process */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4">The Donation Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-6">
              {[
                { step: 1, title: "Registration", icon: FileText, description: "Complete a short form and show ID" },
                { step: 2, title: "Screening", icon: Check, description: "Quick health check and eligibility verification" },
                { step: 3, title: "Donation", icon: Droplet, description: "The donation takes only 8-10 minutes" },
                { step: 4, title: "Refreshments", icon: Heart, description: "Enjoy snacks and rest before leaving" }
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                    <span className="font-bold text-red-600">{item.step}</span>
                  </div>
                  <item.icon className="w-6 h-6 mx-auto mb-2 text-red-500" />
                  <h3 className="font-medium text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Upcoming Donation Events</h2>
              <button className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex items-start mb-3">
                    <div className="p-2 bg-red-100 rounded-lg mr-3">
                      <Calendar className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{event.date}</h3>
                      <p className="text-sm text-gray-500">9:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{event.location}</h3>
                      <p className="text-sm text-gray-500">{event.address}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-green-600 font-medium">{event.slots}</span>
                    <button className="text-white bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700 transition">
                      Register
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4">Lives You've Helped Save</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="border rounded-lg p-5 hover:shadow-md transition">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-300 mr-3 overflow-hidden">
                      <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-medium">{testimonial.name}</h3>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm italic">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Eligibility Checker */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold mb-4">Are You Eligible to Donate?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 mb-4">Check if you meet these basic requirements:</p>
                <ul className="space-y-2">
                  {[
                    "Be at least 17 years old",
                    "Weigh at least 110 pounds",
                    "Be in good general health",
                    "Haven't donated in the last 56 days"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
                  Full Eligibility Quiz
                </button>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <h3 className="font-medium text-red-800 mb-2">Common Restrictions</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>Recent tattoos or piercings (within last 3 months)</li>
                  <li>Low iron levels or anemia</li>
                  <li>Certain medications or medical conditions</li>
                  <li>Recent travel to certain countries</li>
                  <li>Pregnancy (current or recent)</li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">Always consult with donation staff about specific eligibility questions.</p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="bg-gray-50 p-6 rounded-lg border mb-8">
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium text-gray-800">Trusted By Leading Healthcare Institutions</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-24 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center">
                  <div className="w-16 h-6 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                <Award className="w-4 h-4 mr-1" /> Certified by Blood Banks Association
              </div>
            </div>
          </div>

          {/* Documentation & Resources */}
          <h2 className="text-xl font-bold mb-4">Documentation & Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <DocCard title="Our mission" description="is to save lives by ensuring a steady, safe, and sufficient blood supply for those in need." icon={FileText} />
            <DocCard title="Our vision" description=" is to create a world where no life is lost due to a lack of blood." icon={HelpCircle} />
            <DocCard title="Downloads" description="Download user reports, analytics data, and other resources." icon={Download} />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-800 text-white p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">SavesLife</h3>
              <p className="text-gray-300 text-sm">Connecting donors with those in need since 2020. Our platform has helped save thousands of lives through volunteer blood donation.</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Donation Centers</a></li>
                <li><a href="#" className="hover:text-white">How It Works</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>123 Blood Center Ave.</li>
                <li>New York, NY 10001</li>
                <li>contact@saveslife.org</li>
                <li>(123) 456-7890</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Newsletter</h3>
              <p className="text-gray-300 text-sm mb-2">Subscribe for updates on blood drives and opportunities to save lives.</p>
              <div className="flex mt-2">
                <input type="email" placeholder="Your email" className="px-3 py-2 rounded-l text-gray-800 text-sm w-full" />
                <button className="bg-red-600 px-4 rounded-r hover:bg-red-700 transition">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 text-center text-gray-400 text-sm">
            © 2025 SavesLife. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
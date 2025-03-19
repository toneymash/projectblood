import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Activity, User, ChevronDown, Search, Check, Heart } from 'lucide-react';

// Mock donation centers near the selected location
const mockDonationCenters = [
  { id: 1, name: "Nyeri County Hospital Blood Center", distance: "0.3", address: "Central Region, Nyeri", slots: ["8:00 AM", "10:30 AM", "2:00 PM", "4:30 PM"] },
  { id: 2, name: "Red Cross Donation Center", distance: "1.2", address: "Nyeri Town, Main Street", slots: ["9:00 AM", "11:30 AM", "1:00 PM", "3:30 PM"] },
  { id: 3, name: "Central Regional Blood Bank", distance: "2.5", address: "Kamakwa Road, Nyeri", slots: ["8:30 AM", "12:00 PM", "2:30 PM", "5:00 PM"] }
];

const DonationSchedule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedType, setSelectedType] = useState('Whole Blood');
  const [selectedLocation, setSelectedLocation] = useState({ lat: -0.4241, lng: 36.9476 }); // Default: Nyeri
  const [donationCenters, setDonationCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [step, setStep] = useState(1);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];
  
  // Set minimum date to today
  useEffect(() => {
    setSelectedDate(formattedToday);
    
    // Simulate loading donation centers based on location
    setTimeout(() => {
      setDonationCenters(mockDonationCenters);
    }, 500);
  }, []);
  
  const donationTypes = [
    { name: 'Whole Blood', icon: <Heart size={20} className="text-red-500" />, duration: '1 hour', frequency: 'Every 56 days' },
    { name: 'Plasma', icon: <Activity size={20} className="text-yellow-500" />, duration: '1.5 hours', frequency: 'Every 28 days' },
    { name: 'Platelets', icon: <Activity size={20} className="text-orange-500" />, duration: '2 hours', frequency: 'Every 7 days' },
    { name: 'Double Red Cell', icon: <Activity size={20} className="text-red-700" />, duration: '1.5 hours', frequency: 'Every 112 days' }
  ];
  
  const handleSearch = () => {
    // Simulate searching for available slots
    setDonationCenters(mockDonationCenters);
  };
  
  const handleSchedule = () => {
    setIsModalOpen(true);
    setStep(1);
  };
  
  const handleConfirm = () => {
    // In a real app, this would submit the appointment data
    setIsModalOpen(false);
    // Show confirmation (would be handled better in a real app)
    alert("Your donation has been scheduled! Thank you for saving lives.");
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Schedule Your Donation</h1>
          <p className="text-gray-600 mt-1">Find a convenient time and location to donate blood</p>
        </div>
        <button 
          onClick={handleSchedule}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md font-medium flex items-center shadow-md transition duration-200"
        >
          <Heart size={18} className="mr-2" />
          Submit your schedule
        </button>
      </div>
      
      <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-8">
        <div className="flex items-start">
          <div className="bg-red-100 p-2 rounded-full mr-4">
            <Heart className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-red-800">Your donation matters</h3>
            <p className="text-red-700 text-sm">One donation can save up to three lives. Currently, there's an urgent need for O- and B+ blood types in your area.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="date" className="flex items-center text-gray-700 font-medium mb-2">
              <Calendar size={18} className="mr-2 text-red-600" />
               please Select your available Date
            </label>
            <input 
              type="date" 
              id="date" 
              min={formattedToday}
              value={selectedDate}
              className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-red-500 focus:border-red-500"
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          
          <div>
            <label className="flex items-center text-gray-700 font-medium mb-2">
              <Activity size={18} className="mr-2 text-red-600" />
              please select the type of blood you want to Donate ?
            </label>
            <div className="relative">
              <button 
                className="w-full flex items-center justify-between border border-gray-300 rounded-lg shadow-sm p-3 bg-white focus:ring-red-500 focus:border-red-500"
                onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
              >
                <div className="flex items-center">
                  {donationTypes.find(type => type.name === selectedType)?.icon}
                  <span className="ml-2">{selectedType}</span>
                </div>
                <ChevronDown size={20} className="text-gray-500" />
              </button>
              
              {isTypeDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                  {donationTypes.map((type) => (
                    <div 
                      key={type.name} 
                      className="p-3 hover:bg-red-50 cursor-pointer flex items-center justify-between border-b border-gray-100 last:border-b-0"
                      onClick={() => {
                        setSelectedType(type.name);
                        setIsTypeDropdownOpen(false);
                      }}
                    >
                      <div className="flex items-center">
                        {type.icon}
                        <div className="ml-2">
                          <div className="font-medium">{type.name}</div>
                          <div className="text-xs text-gray-500">
                            Duration: {type.duration} • {type.frequency}
                          </div>
                        </div>
                      </div>
                      {selectedType === type.name && (
                        <Check size={18} className="text-red-600" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <label className="flex items-center text-gray-700 font-medium mb-2">
            <MapPin size={18} className="mr-2 text-red-600" />
            please select your location
          </label>
          <div className="bg-gray-100 border border-gray-300 rounded-lg overflow-hidden h-48">
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/api/placeholder/800/400')" }}>
              <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-20">
                <div className="bg-white p-2 rounded-lg shadow-md">
                  <MapPin className="text-red-600" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <MapPin size={14} className="mr-1" />
            <span>Nyeri, Kenya (Lat: {selectedLocation.lat.toFixed(4)}, Lng: {selectedLocation.lng.toFixed(4)})</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end mb-6">
        <button 
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md font-medium flex items-center shadow-md transition duration-200"
          onClick={handleSearch}
        >
          <Search size={18} className="mr-2" />
          Find Donation Centers
        </button>
      </div>
      
      {donationCenters.length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Please select the available Donation Centers</h2>
          
          <div className="space-y-4">
            {donationCenters.map((center) => (
              <div 
                key={center.id}
                className={`border rounded-lg ${selectedCenter?.id === center.id ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-200'} p-4 hover:shadow-md transition duration-200 cursor-pointer`}
                onClick={() => setSelectedCenter(center)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{center.name}</h3>
                    <p className="text-gray-600 text-sm">{center.address}</p>
                  </div>
                  <div className="text-sm bg-red-50 text-red-700 px-2 py-1 rounded-full">
                    {center.distance} km away
                  </div>
                </div>
                
                {selectedCenter?.id === center.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-700 mb-2">Available Time Slots for {formatDate(selectedDate)}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {center.slots.map((slot) => (
                        <button
                          key={slot}
                          className={`p-2 text-sm border rounded ${selectedTimeSlot === slot ? 'bg-red-100 border-red-300 text-red-700' : 'border-gray-200 hover:bg-gray-50'}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTimeSlot(slot);
                          }}
                        >
                          <Clock size={14} className="inline mr-1" />
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Scheduling Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Submit your</h2>
            
            {step === 1 && (
              <>
                <div className="space-y-4 my-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Calendar size={18} className="text-red-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{formatDate(selectedDate)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Clock size={18} className="text-red-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium">{selectedTimeSlot || "Please select a time"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Activity size={18} className="text-red-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Donation Type</p>
                      <p className="font-medium">{selectedType}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <MapPin size={18} className="text-red-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{selectedCenter?.name || "Please select a center"}</p>
                      <p className="text-xs text-gray-500">{selectedCenter?.address}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button 
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-300"
                    onClick={() => setStep(2)}
                    disabled={!selectedCenter || !selectedTimeSlot}
                  >
                    Continue
                  </button>
                </div>
              </>
            )}
            
            {step === 2 && (
              <>
                <div className="my-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100 mb-4">
                    <p className="text-green-800 font-medium flex items-center">
                      <Check size={18} className="mr-2" />
                      You're almost done!
                    </p>
                    <p className="text-green-700 text-sm mt-1">
                      Please review your information before confirming your appointment.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <User size={18} className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Personal Information</p>
                        <p className="font-medium">Please bring a valid ID to your appointment</p>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 pl-8">
                      <ul className="list-disc space-y-1 pl-5">
                        <li>Eat well and stay hydrated before your appointment</li>
                        <li>Get a good night's sleep before donating</li>
                        <li>Avoid strenuous physical activity after donation</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button 
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </button>
                  <button 
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    onClick={handleConfirm}
                  >
                    Confirm Appointment
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationSchedule;
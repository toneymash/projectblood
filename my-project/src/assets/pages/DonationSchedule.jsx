import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Activity, User, ChevronDown, Search, Check, Heart } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Mock data for donation centers
const mockDonationCenters = [
  { id: 1, name: "Nyeri County Hospital Blood Center", distance: "0.3", address: "Central Region, Nyeri", slots: ["8:00 AM", "10:30 AM", "2:00 PM", "4:30 PM"] },
  { id: 2, name: "Red Cross Donation Center", distance: "1.2", address: "Nyeri Town, Main Street", slots: ["9:00 AM", "11:30 AM", "1:00 PM", "3:30 PM"] },
  { id: 3, name: "Central Regional Blood Bank", distance: "2.5", address: "Kamakwa Road, Nyeri", slots: ["8:30 AM", "12:00 PM", "2:30 PM", "5:00 PM"] }
];

// Component to handle user location selection on the map
const LocationMarker = ({ setSelectedLocation }) => {
  useMapEvents({
    click(e) {
      setSelectedLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  return null;
};

const DonationSchedule = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedType, setSelectedType] = useState("Whole Blood");
  const [selectedLocation, setSelectedLocation] = useState({ lat: -0.4241, lng: 36.9476 }); // Default: Nyeri
  const [donationCenters, setDonationCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    setSelectedDate(today);
    setDonationCenters(mockDonationCenters);
  }, []);

  const donationTypes = [
    { name: "Whole Blood", icon: <Heart size={20} className="text-red-500" />, duration: "1 hour", frequency: "Every 56 days" },
    { name: "Plasma", icon: <Activity size={20} className="text-yellow-500" />, duration: "1.5 hours", frequency: "Every 28 days" },
    { name: "Platelets", icon: <Activity size={20} className="text-orange-500" />, duration: "2 hours", frequency: "Every 7 days" },
    { name: "Double Red Cell", icon: <Activity size={20} className="text-red-700" />, duration: "1.5 hours", frequency: "Every 112 days" }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Schedule Your Donation</h1>
          <p className="text-gray-600 mt-1">Find a convenient time and location to donate blood</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Date Selection */}
        <div>
          <label className="flex items-center text-gray-700 font-medium mb-2">
            <Calendar size={18} className="mr-2 text-red-600" />
            Select Your Available Date
          </label>
          <input
            type="date"
            min={today}
            value={selectedDate}
            className="w-full border p-3 rounded-lg"
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        {/* Donation Type Selection */}
        <div>
          <label className="flex items-center text-gray-700 font-medium mb-2">
            <Activity size={18} className="mr-2 text-red-600" />
            Select Type of Donation
          </label>
          <div className="relative">
            <button className="w-full flex items-center justify-between border p-3 rounded-lg bg-white" onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}>
              <div className="flex items-center">
                {donationTypes.find((type) => type.name === selectedType)?.icon}
                <span className="ml-2">{selectedType}</span>
              </div>
              <ChevronDown size={20} />
            </button>
            {isTypeDropdownOpen && (
              <div className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg">
                {donationTypes.map((type) => (
                  <div key={type.name} className="p-3 hover:bg-red-50 cursor-pointer flex justify-between" onClick={() => { setSelectedType(type.name); setIsTypeDropdownOpen(false); }}>
                    <div className="flex items-center">
                      {type.icon}
                      <div className="ml-2">
                        <div className="font-medium">{type.name}</div>
                        <div className="text-xs text-gray-500">{type.duration} • {type.frequency}</div>
                      </div>
                    </div>
                    {selectedType === type.name && <Check size={18} className="text-red-600" />}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Map Location Selection */}
        <div>
          <label className="flex items-center text-gray-700 font-medium mb-2">
            <MapPin size={18} className="mr-2 text-red-600" />
            Select Your Location
          </label>
          <MapContainer center={selectedLocation} zoom={13} style={{ height: "300px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={selectedLocation} />
            <LocationMarker setSelectedLocation={setSelectedLocation} />
          </MapContainer>
          <div className="mt-2 text-sm text-gray-600">
            <MapPin size={14} className="mr-1 inline" />
            Selected Location: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
          </div>
        </div>
      </div>

      {/* Donation Centers */}
      {donationCenters.length > 0 && (
        <div className="border-t mt-6 pt-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Available Donation Centers</h2>
          <div className="space-y-4">
            {donationCenters.map((center) => (
              <div key={center.id} className={`border p-4 rounded-lg cursor-pointer ${selectedCenter?.id === center.id ? "border-red-500" : "border-gray-200"}`} onClick={() => setSelectedCenter(center)}>
                <h3 className="font-medium">{center.name}</h3>
                <p className="text-gray-600 text-sm">{center.address}</p>
                {selectedCenter?.id === center.id && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700">Available Time Slots</p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {center.slots.map((slot) => (
                        <button key={slot} className={`p-2 text-sm border rounded ${selectedTimeSlot === slot ? "bg-red-100 border-red-300 text-red-700" : "border-gray-200 hover:bg-gray-50"}`} onClick={() => setSelectedTimeSlot(slot)}>
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
    </div>
  );
};

export default DonationSchedule;

import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const HospitalRequestForm = () => {
  const [formData, setFormData] = useState({
    hospitalName: "",
    registrationNumber: "",
    contactPerson: "",
    phone: "",
    email: "",
    bloodType: "",
    quantity: "",
    urgency: "Normal",
    reason: "",
    dateNeeded: "",
    hospitalDocument: null,
    location: { lat: -1.286389, lng: 36.817223 }, // Default location (Nairobi, Kenya)
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, hospitalDocument: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Request: ", formData);
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setFormData({ ...formData, location: e.latlng });
      },
    });

    return formData.location ? (
      <Marker position={formData.location}></Marker>
    ) : null;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
          🏥 Hospital Blood Request
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleChange}
              placeholder="Hospital Name"
              required
              className="input-field"
            />
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              placeholder="Hospital Registration Number"
              required
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="input-field"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Hospital Email Address"
              required
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <select
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantity (Units)"
              required
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="Normal">Normal</option>
              <option value="Urgent">Urgent</option>
              <option value="Critical">Critical</option>
            </select>
            <input
              type="date"
              name="dateNeeded"
              value={formData.dateNeeded}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Reason for Request"
            required
            className="input-field h-24"
          ></textarea>

          {/* MAP LOCATION SELECTOR */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Select Hospital Location on Map:
            </label>
            <MapContainer
              center={formData.location}
              zoom={6}
              className="h-60 w-full rounded-lg"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker />
            </MapContainer>
            <p className="text-gray-600 text-sm mt-2">
              Click on the map to set your hospital location.
            </p>
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Upload Hospital License/Document:
            </label>
            <input
              type="file"
              name="hospitalDocument"
              onChange={handleFileChange}
              required
              className="input-field"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 text-lg font-semibold rounded-lg hover:bg-red-700 transition"
          >
            🚑 Submit Blood Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default HospitalRequestForm;

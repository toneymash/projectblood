import { useState } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
});

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
    document: null,
    location: { lat: -1.286389, lng: 36.817223 },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorDetails, setErrorDetails] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, document: file });
      console.log("File selected:", file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrorDetails("");

    if (!formData.location) {
      setMessage("❌ Please select a hospital location on the map.");
      return;
    }

    if (!formData.document) {
      setMessage("❌ Please upload the required hospital document.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "location") {
        data.append("latitude", value.lat);
        data.append("longitude", value.lng);
      } else if (key === "document") {
        data.append("document", value);
      } else {
        data.append(key, value);
      }
    });

    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:4000/api/hospital-request", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201 || res.status === 200) {
        setMessage("✅ Blood request submitted successfully!");
        setFormData({
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
          document: null,
          location: { lat: -1.286389, lng: 36.817223 },
        });
        document.querySelector('input[type="file"]').value = "";
      } else {
        setMessage("❌ Failed to submit the request. Please try again.");
      }
    } catch (error) {
      let errorMsg = "Something went wrong while submitting the form.";
      let details = "";

      if (error.response) {
        errorMsg = error.response.data.message || errorMsg;
        details = JSON.stringify(error.response.data, null, 2);
      } else if (error.request) {
        errorMsg = "No response from server. Please check your connection.";
      }

      setMessage(`❌ ${errorMsg}`);
      setErrorDetails(details);
    } finally {
      setIsLoading(false);
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        console.log("Map clicked at:", e.latlng);
        setFormData({ ...formData, location: e.latlng });
      },
    });

    return formData.location ? <Marker position={formData.location} /> : null;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
          🏥 Hospital Blood Request
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hospital Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleChange}
              placeholder="Hospital Name"
              required
              className="border-2 border-gray-300 p-2 rounded-lg"
            />
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              placeholder="Registration Number"
              required
              className="border-2 border-gray-300 p-2 rounded-lg"
            />
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              placeholder="Contact Person"
              required
              className="border-2 border-gray-300 p-2 rounded-lg"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="border-2 border-gray-300 p-2 rounded-lg"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="border-2 border-gray-300 p-2 w-full rounded-lg"
          />

          {/* Blood & Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <select
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              required
              className="border-2 border-gray-300 p-2 rounded-lg"
            >
              <option value="">Select Blood Type</option>
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantity (Units)"
              required
              className="border-2 border-gray-300 p-2 rounded-lg"
            />
          </div>

          {/* Urgency & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              required
              className="border-2 border-gray-300 p-2 rounded-lg"
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
              className="border-2 border-gray-300 p-2 rounded-lg"
            />
          </div>

          {/* Reason */}
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Reason for Request"
            required
            className="h-24 w-full border-2 border-gray-300 p-2 rounded-lg"
          />

          {/* Map Location */}
          <div>
            <label className="font-medium text-gray-700 mb-2 block">
              Select Hospital Location on Map:
            </label>
            <MapContainer
              center={formData.location}
              zoom={6}
              className="h-60 w-full rounded-lg"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker />
            </MapContainer>
            <p className="text-gray-600 text-sm mt-2">
              Click on the map to set hospital location.
            </p>
            <div className="text-sm text-gray-700 mt-2">
              Coordinates: {formData.location.lat.toFixed(5)}, {formData.location.lng.toFixed(5)}
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Upload Hospital Document:
            </label>
            <input
              type="file"
              name="document"
              onChange={handleFileChange}
              required
              className="border-2 border-gray-300 p-2 rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 text-lg font-semibold rounded-lg transition ${isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 text-white"
              }`}
          >
            {isLoading ? "Submitting..." : "🚑 Submit Blood Request"}
          </button>
        </form>

        {/* Success/Error Message */}
        {message && (
          <div className={`mt-6 text-center text-sm text-white p-3 rounded-lg ${message.startsWith("✅") ? "bg-green-500" : "bg-red-500"
            }`}>
            {message}
          </div>
        )}

        {/* Error Details */}
        {errorDetails && (
          <div className="mt-4 p-3 bg-gray-100 rounded-lg text-xs overflow-auto max-h-40">
            <pre>{errorDetails}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalRequestForm;

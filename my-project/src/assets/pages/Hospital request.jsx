import { useState } from "react";

const HospitalRequestForm = () => {
  const [formData, setFormData] = useState({
    hospitalName: "",
    contactPerson: "",
    phone: "",
    email: "",
    bloodType: "",
    quantity: "",
    urgency: "Normal",
    reason: "",
    location: "",
    dateNeeded: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Request: ", formData);
    // Send request to backend here
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Hospital Blood Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="hospitalName" placeholder="Hospital Name" className="w-full p-2 border rounded" onChange={handleChange} required />
        <input type="text" name="contactPerson" placeholder="Contact Person" className="w-full p-2 border rounded" onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" className="w-full p-2 border rounded" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email (Optional)" className="w-full p-2 border rounded" onChange={handleChange} />
        
        <select name="bloodType" className="w-full p-2 border rounded" onChange={handleChange} required>
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
        
        <input type="number" name="quantity" placeholder="Quantity Needed" className="w-full p-2 border rounded" onChange={handleChange} required />
        
        <select name="urgency" className="w-full p-2 border rounded" onChange={handleChange} required>
          <option value="Normal">Normal</option>
          <option value="Urgent">Urgent</option>
          <option value="Critical">Critical</option>
        </select>

        <textarea name="reason" placeholder="Reason for Request" className="w-full p-2 border rounded" onChange={handleChange} required></textarea>
        <input type="text" name="location" placeholder="Location" className="w-full p-2 border rounded" onChange={handleChange} required />
        <input type="date" name="dateNeeded" className="w-full p-2 border rounded" onChange={handleChange} required />
        
        <button type="submit" className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700">Submit Request</button>
      </form>
    </div>
  );
};

export default HospitalRequestForm;

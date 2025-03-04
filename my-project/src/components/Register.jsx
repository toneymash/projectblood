import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate(); // For redirecting after successful registration
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Password: "",
    Role: "donor", // Default role selection
  });

  const [loading, setLoading] = useState(false); // Spinner state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner

    try {
      const response = await fetch("http://localhost:4000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();            

      if (response.ok) {
        alert("Registration successful! Redirecting to login...");
        navigate("/login"); // Redirect to login page after successful registration
      } else {
        alert(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="mb-4 text-xl font-bold text-blue-700">Register</h2>
        <input type="text" name="Name" placeholder="Full Name" onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
        <input type="email" name="Email" placeholder="Email" onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
        <input type="text" name="Phone" placeholder="Phone Number" onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
        <input type="password" name="Password" placeholder="Password" onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
        
        <select name="Role" onChange={handleChange} className="w-full p-2 mb-2 border rounded">
          <option value="donor">Donor</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" className="w-full p-2 text-white bg-blue-700 rounded flex justify-center items-center">
          {loading ? <span className="loader"></span> : "Register"}
        </button>
      </form>

      {/* Spinner Styles */}
      <style>
        {`
          .loader {
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Register;

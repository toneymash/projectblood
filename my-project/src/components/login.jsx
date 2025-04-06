import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, X } from "lucide-react";
import { jwtDecode } from "jwt-decode"; // Correct import

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: formData.email,
          Password: formData.password
        })
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Decode the JWT token to get user role
      const decoded = jwtDecode(data.token); // Fixed variable name here
      const role = decoded.Role;

      // ✅ Store token and role in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", role);

      // ✅ Redirect based on role
      if (role === "admin") {
        window.alert("Welcome to the Admin Dashboard");
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      if (!navigator.onLine) {
        setError("Network error. Please check your internet connection.");
      } else if (error.message === "Failed to fetch") {
        setError("Unable to connect to the server. Please try again later.");
      } else {
        setError(error.message || "Login failed. Please try again.");
      }
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md w-96">
        <h2 className="mb-4 text-xl font-bold text-center">Blood Donation System Login</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center justify-between">
              <span className="text-red-800 text-sm">{error}</span>
              <button
                type="button"
                onClick={() => setError("")}
                className="p-1 hover:bg-red-100 rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-red-500" />
              </button>
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={isLoading}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-500 rounded flex items-center justify-center disabled:bg-blue-300 hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

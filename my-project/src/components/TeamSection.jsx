import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "Al",
    role: "Creative Leader",
    image: "https://via.placeholder.com/150",
  },
  {
    name: " Brown",
    role: "Sales Manager",
    image: "https://via.placeholder.com/150",
  },
  {
    name: " Richmond",
    role: "Web Developer",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Roxie Swanson",
    role: "Web Designer",
    image: "https://via.placeholder.com/150",
  },
];

const TeamSection = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-8 bg-white flex justify-between items-center">
        <Link to="/" className="text-blue-600 hover:text-blue-700">← Back to Dashboard</Link>
        <h1 className="text-2xl font-bold text-red-800">Our Team</h1>
        <div></div>
      </div>
      <div className="py-12 bg-gray-50 text-center">
        <h2 className="text-4xl font-bold text-orange-600 mb-10">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-transform transform hover:scale-105"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto border-4 border-orange-400"
              />
              <h3 className="text-xl font-semibold mt-4 text-gray-800">{member.name}</h3>
              <p className="text-gray-500 text-sm mt-1 font-medium">{member.role}</p>
              <p className="text-gray-600 text-xs mt-2 px-2">
                Passionate about creating innovative solutions and bringing ideas to life.
              </p>
              <div className="flex justify-center space-x-4 mt-4 text-orange-500">
                <FaFacebookF className="cursor-pointer hover:text-orange-700 transition" />
                <FaTwitter className="cursor-pointer hover:text-orange-700 transition" />
                <FaInstagram className="cursor-pointer hover:text-orange-700 transition" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
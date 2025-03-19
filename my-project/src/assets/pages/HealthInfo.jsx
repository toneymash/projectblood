import React from 'react';
import { Heart, CheckCircle, Droplets, UserCheck } from 'lucide-react';

const HealthInfo = () => {
    return (
        <div className="p-8 bg-gradient-to-r from-green-50 to-white rounded-2xl shadow-lg max-w-3xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-green-700 mb-3">Your Health & Donation</h1>
                <p className="text-gray-600 text-lg">Essential guidelines for a safe and beneficial blood donation experience.</p>
            </div>

            <div className="space-y-6">
                {[{
                    icon: <UserCheck className="w-10 h-10 text-blue-500" />, 
                    title: "Who Can Donate?", 
                    description: "Generally, healthy individuals aged 16-65 and weighing at least 50kg are eligible."
                }, {
                    icon: <Heart className="w-10 h-10 text-red-500" />, 
                    title: "Health Benefits of Donating", 
                    description: "May help regulate iron levels, improve blood circulation, and contribute to overall wellness."
                }, {
                    icon: <Droplets className="w-10 h-10 text-yellow-500" />, 
                    title: "Preparing for Donation", 
                    description: "Stay hydrated, eat a nutritious meal, and ensure you feel well on the day of donation."
                }, {
                    icon: <CheckCircle className="w-10 h-10 text-green-500" />, 
                    title: "Post-Donation Care", 
                    description: "Replenish fluids, avoid strenuous activity for a few hours, and rest if needed."
                }].map((item, index) => (
                    <div key={index} className="flex items-start p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
                        <div className="mr-5">{item.icon}</div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
                            <p className="text-gray-600 mt-1">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HealthInfo;
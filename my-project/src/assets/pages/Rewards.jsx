import React from 'react';
import { Gift, CalendarCheck, Medal } from 'lucide-react';

const Rewards = () => {
    return (
        <div className="p-8 bg-gradient-to-r from-yellow-50 to-white rounded-2xl shadow-lg max-w-3xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-yellow-700 mb-3">Donation Rewards</h1>
                <p className="text-gray-600 text-lg">Your generosity is recognized! Earn rewards for your life-saving donations.</p>
            </div>

            <div className="space-y-6">
                {[{
                    icon: <CalendarCheck className="w-10 h-10 text-blue-500" />, 
                    title: "Donation Schedule", 
                    description: "Track your past and upcoming donations with ease. Stay informed and plan ahead."
                }, {
                    icon: <Gift className="w-10 h-10 text-red-500" />, 
                    title: "Exclusive Perks", 
                    description: "Enjoy donor-exclusive rewards such as badges, discounts, and priority access to events."
                }, {
                    icon: <Medal className="w-10 h-10 text-green-500" />, 
                    title: "Achievement Badges", 
                    description: "Unlock milestones and receive digital badges for each successful donation."
                }].map((item, index) => (
                    <div key={index} className="flex items-start p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
                        <div className="mr-5">{item.icon}</div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
                            <p className="mt-1 text-gray-600">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-10 border-t pt-6">
                <p className="text-gray-700 text-lg italic">“The gift of blood is the gift of life. There is no substitute for human blood.”</p>
                <p className="text-gray-600 mt-2">Every drop counts. Keep saving lives, one donation at a time! ❤️</p>
            </div>
        </div>
    );
};

export default Rewards;

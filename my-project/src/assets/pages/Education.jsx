import React from 'react';
import { HeartPulse, UserCheck, ClipboardList, Lightbulb } from 'lucide-react';

const Education = () => {
    return (
        <div className="p-8 bg-gradient-to-r from-red-50 to-white rounded-2xl shadow-lg max-w-3xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-red-700 mb-3">Blood Donation Education</h1>
                <p className="text-gray-600 text-lg">Learn how your donation can save lives and what to expect during the process.</p>
            </div>

            <div className="space-y-6">
                {[{
                    icon: <HeartPulse className="w-10 h-10 text-red-500" />, 
                    title: "Why Donate Blood?", 
                    description: "Blood donation saves lives by providing blood for accident victims, surgical patients, and those with medical conditions like anemia. Just one donation can save up to three lives!"
                }, {
                    icon: <UserCheck className="w-10 h-10 text-blue-500" />, 
                    title: "Who Can Donate?", 
                    description: (
                        <ul className="list-disc pl-6 text-gray-600">
                            <li>Be at least 16 years old (depending on local regulations).</li>
                            <li>Weigh at least 50 kg (110 lbs).</li>
                            <li>Be in good general health and feeling well.</li>
                            <li>Have no recent infections or chronic illnesses.</li>
                        </ul>
                    )
                }, {
                    icon: <ClipboardList className="w-10 h-10 text-green-500" />, 
                    title: "Donation Process", 
                    description: (
                        <ol className="list-decimal pl-6 text-gray-600">
                            <li><strong>Registration:</strong> Provide identification and complete a health questionnaire.</li>
                            <li><strong>Health Check:</strong> A quick check of your blood pressure, pulse, and hemoglobin levels.</li>
                            <li><strong>Donation:</strong> A small amount of blood is drawn, typically taking 8-10 minutes.</li>
                            <li><strong>Recovery:</strong> Rest and enjoy a light snack before resuming your day.</li>
                        </ol>
                    )
                }, {
                    icon: <Lightbulb className="w-10 h-10 text-yellow-500" />, 
                    title: "Tips for a Successful Donation", 
                    description: (
                        <ul className="list-disc pl-6 text-gray-600">
                            <li>Stay hydrated by drinking plenty of water.</li>
                            <li>Eat a nutritious meal before donating.</li>
                            <li>Avoid alcohol and caffeine before donation.</li>
                            <li>Get enough rest the night before.</li>
                        </ul>
                    )
                }].map((item, index) => (
                    <div key={index} className="flex items-start p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
                        <div className="mr-5">{item.icon}</div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
                            <p className="mt-1">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-gray-600 italic text-center mt-6">Your donation can make a difference. Give blood, save lives!</p>
        </div>
    );
};

export default Education;
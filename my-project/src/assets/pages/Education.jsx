import React, { useState } from 'react';
import { HeartPulse, UserCheck, ClipboardList, Lightbulb, Video, Calendar, Book, Award, AlertCircle, ChevronRight, ChevronDown, Info, FileText, Check } from 'lucide-react';

const Education = () => {
    const [activeTab, setActiveTab] = useState('basics');
    const [expandedFAQ, setExpandedFAQ] = useState(null);

    const toggleFAQ = (index) => {
        setExpandedFAQ(expandedFAQ === index ? null : index);
    };

    const faqs = [
        {
            question: "How often can I donate blood?",
            answer: "Most people can donate whole blood every 8-12 weeks. For plasma donation, you can donate more frequently, typically every 2-4 weeks. Platelets can be donated every 7 days, up to 24 times per year."
        },
        {
            question: "Does blood donation hurt?",
            answer: "Most donors feel only a brief pinch when the needle is inserted. The actual blood donation process is usually painless. Our trained staff ensure your comfort throughout the process."
        },
        {
            question: "How long does the donation process take?",
            answer: "The actual blood draw typically takes only 8-10 minutes. However, the entire process—including registration, health screening, and recovery—usually takes about 45-60 minutes for first-time donors and 30-45 minutes for return donors."
        },
        {
            question: "What happens to my blood after donation?",
            answer: "After collection, your blood is tested, processed, and separated into components (red cells, plasma, and platelets). These components are then distributed to hospitals and medical facilities where they're used for patients in need."
        }
    ];

    const bloodTypes = [
        { type: "O-", canGiveTo: "All blood types", canReceiveFrom: "O-" },
        { type: "O+", canGiveTo: "O+, A+, B+, AB+", canReceiveFrom: "O-, O+" },
        { type: "A-", canGiveTo: "A-, A+, AB-, AB+", canReceiveFrom: "A-, O-" },
        { type: "A+", canGiveTo: "A+, AB+", canReceiveFrom: "A-, A+, O-, O+" },
        { type: "B-", canGiveTo: "B-, B+, AB-, AB+", canReceiveFrom: "B-, O-" },
        { type: "B+", canGiveTo: "B+, AB+", canReceiveFrom: "B-, B+, O-, O+" },
        { type: "AB-", canGiveTo: "AB-, AB+", canReceiveFrom: "AB-, A-, B-, O-" },
        { type: "AB+", canGiveTo: "AB+ only", canReceiveFrom: "All blood types" }
    ];

    const tabs = [
        { id: 'basics', name: 'Basics', icon: <Book className="w-5 h-5 mr-2" /> },
        { id: 'myths', name: 'Common Myths', icon: <AlertCircle className="w-5 h-5 mr-2" /> },
        { id: 'types', name: 'Blood Types', icon: <FileText className="w-5 h-5 mr-2" /> },
        { id: 'faq', name: 'FAQs', icon: <Info className="w-5 h-5 mr-2" /> }
    ];

    const educationContent = {
        basics: [
            {
                icon: <HeartPulse className="w-10 h-10 text-red-500" />,
                title: "Why Donate Blood?",
                description: (
                    <div>
                        <p className="text-gray-600 mb-2">Blood donation saves lives by providing blood for accident victims, surgical patients, and those with medical conditions like anemia. Just one donation can save up to three lives!</p>
                        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                            <div className="bg-red-50 p-2 rounded-lg">
                                <p className="text-2xl font-bold text-red-600">4.5M</p>
                                <p className="text-xs text-gray-600">Americans need blood yearly</p>
                            </div>
                            <div className="bg-red-50 p-2 rounded-lg">
                                <p className="text-2xl font-bold text-red-600">43K</p>
                                <p className="text-xs text-gray-600">Pints needed daily</p>
                            </div>
                            <div className="bg-red-50 p-2 rounded-lg">
                                <p className="text-2xl font-bold text-red-600">3</p>
                                <p className="text-xs text-gray-600">Lives saved per donation</p>
                            </div>
                        </div>
                    </div>
                )
            },
            {
                icon: <UserCheck className="w-10 h-10 text-blue-500" />,
                title: "Who Can Donate?",
                description: (
                    <div>
                        <ul className="list-disc pl-6 text-gray-600 mb-3">
                            <li>Be at least 16 years old (depending on local regulations).</li>
                            <li>Weigh at least 50 kg (110 lbs).</li>
                            <li>Be in good general health and feeling well.</li>
                            <li>Have no recent infections or chronic illnesses.</li>
                        </ul>
                        <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm text-blue-700"><strong>Note:</strong> Some medications and recent travel may affect eligibility. Our staff will review your specific situation during screening.</p>
                        </div>
                    </div>
                )
            },
            {
                icon: <ClipboardList className="w-10 h-10 text-green-500" />,
                title: "Donation Process",
                description: (
                    <div>
                        <ol className="list-decimal pl-6 text-gray-600">
                            <li><strong>Registration:</strong> Provide identification and complete a health questionnaire.</li>
                            <li><strong>Health Check:</strong> A quick check of your blood pressure, pulse, and hemoglobin levels.</li>
                            <li><strong>Donation:</strong> A small amount of blood is drawn, typically taking 8-10 minutes.</li>
                            <li><strong>Recovery:</strong> Rest and enjoy a light snack before resuming your day.</li>
                        </ol>
                        <div className="mt-3 flex items-center justify-center">
                            <div className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center">
                                <Clock className="w-4 h-4 mr-2" />
                                Total time: About 1 hour for first-time donors
                            </div>
                        </div>
                    </div>
                )
            },
            {
                icon: <Lightbulb className="w-10 h-10 text-yellow-500" />,
                title: "Tips for a Successful Donation",
                description: (
                    <div>
                        <ul className="list-disc pl-6 text-gray-600">
                            <li>Stay hydrated by drinking plenty of water.</li>
                            <li>Eat a nutritious meal before donating.</li>
                            <li>Avoid alcohol and caffeine before donation.</li>
                            <li>Get enough rest the night before.</li>
                        </ul>
                        <div className="mt-3 p-3 bg-yellow-50 rounded-lg text-sm text-yellow-700">
                            <p><strong>Pro tip:</strong> Wear a short-sleeved shirt or one with sleeves that can be easily rolled up.</p>
                        </div>
                    </div>
                )
            }
        ],
        myths: [
            {
                icon: <AlertCircle className="w-10 h-10 text-purple-500" />,
                title: "Common Myths About Blood Donation",
                description: (
                    <div className="space-y-4">
                        <div className="border-l-4 border-purple-400 pl-3">
                            <h3 className="font-medium text-gray-800">Myth: Blood donation is painful</h3>
                            <p className="text-gray-600">Most donors feel only a quick pinch, similar to a small pinch. The actual donation process is generally painless.</p>
                        </div>
                        <div className="border-l-4 border-purple-400 pl-3">
                            <h3 className="font-medium text-gray-800">Myth: Donating blood makes you weak</h3>
                            <p className="text-gray-600">Your body quickly replaces the fluid lost during donation, and most people can resume normal activities the same day.</p>
                        </div>
                        <div className="border-l-4 border-purple-400 pl-3">
                            <h3 className="font-medium text-gray-800">Myth: You can catch diseases by donating blood</h3>
                            <p className="text-gray-600">All equipment used is sterile and used only once, making it impossible to contract diseases through donation.</p>
                        </div>
                        <div className="border-l-4 border-purple-400 pl-3">
                            <h3 className="font-medium text-gray-800">Myth: I can't donate if I have tattoos</h3>
                            <p className="text-gray-600">In most places, you can donate blood after getting a tattoo if it was applied in a regulated facility and has completely healed.</p>
                        </div>
                    </div>
                )
            }
        ],
        types: [
            {
                icon: <FileText className="w-10 h-10 text-blue-500" />,
                title: "Understanding Blood Types",
                description: (
                    <div>
                        <p className="text-gray-600 mb-4">Your blood type determines who can receive your donated blood. There are eight common blood types, categorized by the ABO system and the Rh factor (positive or negative).</p>

                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Blood Type</th>
                                        <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Can Give To</th>
                                        <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-700">Can Receive From</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bloodTypes.map((blood, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                            <td className="py-2 px-4 border-b text-sm font-medium text-gray-900">{blood.type}</td>
                                            <td className="py-2 px-4 border-b text-sm text-gray-600">{blood.canGiveTo}</td>
                                            <td className="py-2 px-4 border-b text-sm text-gray-600">{blood.canReceiveFrom}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 bg-blue-50 p-3 rounded-lg text-sm">
                            <p className="text-blue-700">
                                <strong>Did you know?</strong> Type O negative is the "universal donor" as it can be given to any recipient, regardless of their blood type. Type AB positive is the "universal recipient" as it can receive any blood type.
                            </p>
                        </div>
                    </div>
                )
            }
        ],
        faq: [
            {
                icon: <Info className="w-10 h-10 text-indigo-500" />,
                title: "Frequently Asked Questions",
                description: (
                    <div className="space-y-3">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                <button
                                    className="w-full text-left px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <span className="font-medium text-gray-800">{faq.question}</span>
                                    {expandedFAQ === index ?
                                        <ChevronDown className="w-5 h-5 text-gray-500" /> :
                                        <ChevronRight className="w-5 h-5 text-gray-500" />
                                    }
                                </button>
                                {expandedFAQ === index && (
                                    <div className="px-4 py-3 text-gray-600 bg-white">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )
            }
        ]
    };

    return (
        <div className="p-8 bg-gradient-to-r from-red-50 to-white rounded-2xl shadow-lg max-w-3xl mx-auto">
            <div className="text-center mb-8">
                <HeartPulse className="w-12 h-12 text-red-600 mx-auto mb-3" />
                <h1 className="text-4xl font-bold text-red-700 mb-3">Blood Donation Education</h1>
                <p className="text-gray-600 text-lg">Learn how your donation can save lives and what to expect during the process.</p>
            </div>

            <div className="flex border-b border-gray-200 mb-6 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`flex items-center px-4 py-2 font-medium text-sm border-b-2 whitespace-nowrap ${activeTab === tab.id
                                ? 'border-red-500 text-red-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.icon}
                        {tab.name}
                    </button>
                ))}
            </div>

            <div className="space-y-6">
                {educationContent[activeTab].map((item, index) => (
                    <div key={index} className="flex flex-col md:flex-row p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                        <div className="md:mr-5 flex justify-center mb-4 md:mb-0">
                            {item.icon}
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h2>
                            {item.description}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-4 bg-red-50 rounded-xl border border-red-100">
                <div className="flex items-start">
                    <Video className="w-6 h-6 text-red-500 mr-3 mt-1" />
                    <div>
                        <h3 className="font-medium text-gray-900">Educational Resources</h3>
                        <p className="text-gray-600 text-sm mt-1">Watch our comprehensive video series about blood donation or download our educational materials for more information.</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            <button className="inline-flex items-center px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                                <Video className="w-4 h-4 mr-1" />
                                Watch Videos
                            </button>
                            <button className="inline-flex items-center px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                                <FileText className="w-4 h-4 mr-1" />
                                Download Guide
                            </button>
                            <button className="inline-flex items-center px-3 py-1 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                                <Calendar className="w-4 h-4 mr-1" />
                                Join Workshop
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-8">
                <button className="px-6 py-3 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition-colors inline-flex items-center shadow-md">
                    <Award className="w-5 h-5 mr-2" />
                    Become a Blood Donor Today
                </button>
                <p className="text-gray-600 italic text-center mt-3">Your donation can make a difference. Give blood, save lives!</p>
            </div>
        </div>
    );
};

// Fix for missing Clock component
const Clock = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);

export default Education;
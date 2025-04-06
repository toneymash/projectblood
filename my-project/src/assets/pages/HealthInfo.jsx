import React, { useState } from 'react';
import { Heart, CheckCircle, Droplets, UserCheck, AlertTriangle, Coffee, Clock, Info, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

const HealthInfo = () => {
    const [expandedSection, setExpandedSection] = useState(null);
    const [showTips, setShowTips] = useState(false);

    const toggleExpand = (index) => {
        setExpandedSection(expandedSection === index ? null : index);
    };

    const sections = [
        {
            icon: <UserCheck className="w-10 h-10 text-blue-500" />,
            title: "Who Can Donate?",
            description: "Generally, healthy individuals aged 16-65 and weighing at least 50kg are eligible.",
            expandedInfo: "Donors should be in good health, with no active infections or certain chronic conditions. Specific requirements may vary based on local regulations and medical standards. A screening will be conducted before donation to ensure your safety.",
            stats: "75% of the population is eligible to donate blood, but only about 3% do."
        }, {
            icon: <Heart className="w-10 h-10 text-red-500" />,
            title: "Health Benefits of Donating",
            description: "May help regulate iron levels, improve blood circulation, and contribute to overall wellness.",
            expandedInfo: "Regular blood donation can reduce the risk of heart disease, stimulate blood cell production, and provide free health screenings. It's also linked to reduced risk of certain cancers and improved cardiovascular health.",
            stats: "Donating blood burns approximately 650 calories and can help maintain healthy iron levels."
        }, {
            icon: <Droplets className="w-10 h-10 text-yellow-500" />,
            title: "Preparing for Donation",
            description: "Stay hydrated, eat a nutritious meal, and ensure you feel well on the day of donation.",
            expandedInfo: "In the 24 hours before donating, drink plenty of water, avoid alcohol, eat iron-rich foods, and get adequate sleep. Wear comfortable clothing with sleeves that can be rolled up easily.",
            checkList: ["Drink extra water", "Eat iron-rich foods", "Get enough sleep", "Bring ID"]
        }, {
            icon: <CheckCircle className="w-10 h-10 text-green-500" />,
            title: "Post-Donation Care",
            description: "Replenish fluids, avoid strenuous activity for a few hours, and rest if needed.",
            expandedInfo: "After donating, rest for 10-15 minutes and have a snack. Continue to drink fluids and avoid alcohol for 24 hours. Avoid heavy lifting or intense exercise for the remainder of the day.",
            timeToRecover: "Your body replaces the fluid portion of blood within 24 hours, while red blood cells regenerate fully within 4-6 weeks."
        }, {
            icon: <AlertTriangle className="w-10 h-10 text-orange-500" />,
            title: "Potential Side Effects",
            description: "Most donors experience no side effects, but some may have temporary dizziness or site bruising.",
            expandedInfo: "Side effects are typically mild and short-lived. They may include lightheadedness, nausea, or a small bruise at the needle site. Serious complications are extremely rare.",
            riskFactor: "Less than 2% of donors experience adverse reactions requiring attention."
        }
    ];

    const quickTips = [
        "Blood donation takes only about 8-10 minutes, but the entire process may take an hour",
        "A single donation can save up to three lives",
        "Your body contains approximately 10 pints of blood and donates only 1 pint",
        "Most people can donate blood every 8-12 weeks",
        "Type O negative blood is universal and can be given to anyone"
    ];

    return (
        <div className="p-8 bg-gradient-to-r from-green-50 to-white rounded-2xl shadow-lg max-w-3xl mx-auto">
            <div className="text-center mb-10">
                <Heart className="w-12 h-12 text-red-500 mx-auto mb-3" />
                <h1 className="text-4xl font-bold text-green-700 mb-3">Your Health & Donation</h1>
                <p className="text-gray-600 text-lg">Essential guidelines for a safe and beneficial blood donation experience.</p>
                <div className="mt-4 inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                    <Droplets className="w-4 h-4 mr-2" />
                    Every donation matters
                </div>
            </div>

            <div className="space-y-6">
                {sections.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                    >
                        <div
                            className="flex items-start p-6 cursor-pointer"
                            onClick={() => toggleExpand(index)}
                        >
                            <div className="mr-5">{item.icon}</div>
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
                                <p className="text-gray-600 mt-1">{item.description}</p>
                            </div>
                            <div className="ml-2 text-gray-400">
                                {expandedSection === index ?
                                    <ChevronUp className="w-5 h-5" /> :
                                    <ChevronDown className="w-5 h-5" />
                                }
                            </div>
                        </div>

                        {expandedSection === index && (
                            <div className="px-6 pb-6 pt-1 border-t border-gray-100">
                                <p className="text-gray-700 mb-3">{item.expandedInfo}</p>

                                {item.stats && (
                                    <div className="mt-3 bg-blue-50 p-3 rounded-lg text-blue-700 text-sm flex items-start">
                                        <Info className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                                        <span>{item.stats}</span>
                                    </div>
                                )}

                                {item.checkList && (
                                    <div className="mt-3">
                                        <h3 className="font-medium text-gray-700 mb-2">Preparation Checklist:</h3>
                                        <ul className="space-y-1">
                                            {item.checkList.map((check, i) => (
                                                <li key={i} className="flex items-center text-gray-600">
                                                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                                    {check}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {item.timeToRecover && (
                                    <div className="mt-3 flex items-start">
                                        <Clock className="w-4 h-4 mr-2 mt-1 text-purple-500" />
                                        <span className="text-gray-700">{item.timeToRecover}</span>
                                    </div>
                                )}

                                {item.riskFactor && (
                                    <div className="mt-3 bg-orange-50 p-3 rounded-lg text-orange-700 text-sm flex items-start">
                                        <AlertTriangle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                                        <span>{item.riskFactor}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-8">
                <button
                    onClick={() => setShowTips(!showTips)}
                    className="flex items-center justify-center w-full py-3 bg-green-100 text-green-700 rounded-xl font-medium hover:bg-green-200 transition-colors"
                >
                    <Coffee className="w-5 h-5 mr-2" />
                    {showTips ? "Hide Quick Tips" : "Show Quick Tips"}
                </button>

                {showTips && (
                    <div className="mt-4 bg-white p-5 rounded-xl shadow-md">
                        <h3 className="font-semibold text-lg text-gray-800 mb-3">Did You Know?</h3>
                        <ul className="space-y-2">
                            {quickTips.map((tip, index) => (
                                <li key={index} className="flex items-start">
                                    <ArrowRight className="w-4 h-4 mr-2 mt-1 text-blue-500" />
                                    <span className="text-gray-700">{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="mt-8 text-center">
                <button className="px-6 py-3 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition-colors inline-flex items-center shadow-md">
                    <Heart className="w-5 h-5 mr-2" />
                    Schedule Your Donation
                </button>
                <p className="mt-3 text-sm text-gray-500">Your single donation can save up to three lives!</p>
            </div>
        </div>
    );
};

export default HealthInfo;
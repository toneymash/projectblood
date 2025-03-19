import React from 'react';
import { Users, Heart, CalendarDays, HandHeart } from 'lucide-react'; // Import icons

const Community = () => {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-serif font-semibold text-red-600 mb-2">
                    Our Shared Heartbeat
                </h1>
                <p className="text-gray-700 leading-relaxed">
                    A space to connect, inspire, and amplify the impact of every drop.
                </p>
            </div>

            <div className="space-y-6">
                <div className="flex items-center p-5 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                    <Users className="w-8 h-8 text-blue-500 mr-4" />
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Join the Conversation
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Dive into discussions that matter. Share your thoughts and learn from others.
                        </p>
                        {/* Placeholder for future chat preview or link */}
                    </div>
                </div>

                <div className="flex items-center p-5 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                    <Heart className="w-8 h-8 text-red-500 mr-4" />
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Stories of Hope
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Every donation has a story. Share yours and inspire a ripple effect of giving.
                        </p>
                        {/* Placeholder for future story sharing feature */}
                    </div>
                </div>

                <div className="flex items-center p-5 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                    <HandHeart className="w-8 h-8 text-green-500 mr-4" />
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Make a Deeper Impact
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Explore volunteer roles and help us extend our reach beyond donations.
                        </p>
                        {/* Placeholder for volunteer sign-up or info */}
                    </div>
                </div>

                <div className="flex items-center p-5 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                    <CalendarDays className="w-8 h-8 text-purple-500 mr-4" />
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Upcoming Gatherings
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Stay informed about upcoming blood drives and community events. Mark your calendar!
                        </p>
                        {/* Placeholder for event listing or calendar */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Community;
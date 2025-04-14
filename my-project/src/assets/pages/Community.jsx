import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, Heart, CalendarDays, HandHeart } from 'lucide-react';

const Community = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ title: '', description: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () => {
        setLoading(true);
        axios
            .get('http://localhost:4000/api/community')
            .then((res) => {
                const data = res.data?.data || [];
                setPosts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching community posts:', error);
                setPosts([]); // fallback
                setLoading(false);
            });
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        axios
            .post('http://localhost:4000/api/community', formData)
            .then(() => {
                setFormData({ title: '', description: '' });
                fetchPosts();
                setSubmitting(false);
            })
            .catch((error) => {
                console.error('Error submitting post:', error);
                setSubmitting(false);
            });
    };

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

            {/* Static Cards */}
            <div className="space-y-6 mb-10">
                <InfoCard
                    icon={<Users className="w-8 h-8 text-blue-500 mr-4" />}
                    title="Join the Conversation"
                    description="Dive into discussions that matter. Share your thoughts and learn from others."
                />
                <InfoCard
                    icon={<Heart className="w-8 h-8 text-red-500 mr-4" />}
                    title="Stories of Hope"
                    description="Every donation has a story. Share yours and inspire a ripple effect of giving."
                />
                <InfoCard
                    icon={<HandHeart className="w-8 h-8 text-green-500 mr-4" />}
                    title="Make a Deeper Impact"
                    description="Explore volunteer roles and help us extend our reach beyond donations."
                />
                <InfoCard
                    icon={<CalendarDays className="w-8 h-8 text-purple-500 mr-4" />}
                    title="Upcoming Gatherings"
                    description="Stay informed about upcoming blood drives and community events. Mark your calendar!"
                />
            </div>

            {/* Submit New Post */}
            <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Share Your Story</h2>
                <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded shadow">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                            rows={4}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                        disabled={submitting}
                    >
                        {submitting ? 'Sharing...' : 'Share Post'}
                    </button>
                </form>
            </div>

            {/* Community Posts */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Community Posts</h2>
                {loading ? (
                    <p className="text-gray-600">Loading posts...</p>
                ) : Array.isArray(posts) && posts.length === 0 ? (
                    <p className="text-gray-500 italic">No posts yet. Be the first to share!</p>
                ) : (
                    <div className="space-y-4">
                        {Array.isArray(posts) &&
                            posts.map((post) => (
                                <div key={post.id} className="p-4 bg-gray-100 rounded shadow">
                                    <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                                    <p className="text-gray-700">{post.description}</p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Posted on: {new Date(post.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const InfoCard = ({ icon, title, description }) => (
    <div className="flex items-center p-5 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
        {icon}
        <div>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    </div>
);

export default Community;

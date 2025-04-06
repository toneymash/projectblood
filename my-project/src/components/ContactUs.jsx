import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSubmitted(false);

        try {
            // Example: Replace this with real API call
            const response = await fetch("http://localhost:4000/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) throw new Error(result.message || "Submission failed");

            setSubmitted(true);
            setFormData({ name: "", email: "", message: "" });
        } catch (err) {
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen py-10 px-4 md:px-8">
            <div className="max-w-4xl mx-auto shadow-lg rounded-lg p-6 md:p-10 border border-gray-200">
                <h1 className="text-3xl font-bold text-center text-red-600 mb-8">Contact Us</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Details */}
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <FaMapMarkerAlt className="text-red-500 text-xl mt-1" />
                            <div>
                                <h4 className="font-semibold">Our Address</h4>
                                <p>Nairobi, Kenya</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <MdEmail className="text-red-500 text-xl mt-1" />
                            <div>
                                <h4 className="font-semibold">Email Us</h4>
                                <p>support@blooddonation.org</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <FaPhoneAlt className="text-red-500 text-xl mt-1" />
                            <div>
                                <h4 className="font-semibold">Call Us</h4>
                                <p>+254 712 345678</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block mb-1 font-medium">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Your Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full p-2 border rounded h-28 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            ></textarea>
                        </div>

                        {error && <p className="text-red-600">{error}</p>}
                        {submitted && <p className="text-green-600">Message sent successfully!</p>}

                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded shadow disabled:bg-red-300"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;

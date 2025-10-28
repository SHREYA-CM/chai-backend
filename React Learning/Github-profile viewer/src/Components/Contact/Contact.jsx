import React, { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState(null); // For tracking form submission status

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Submitting...");

        // Simulate form submission (you could replace this with a real API call)
        setTimeout(() => {
            setStatus("Thank you for your message! We will get back to you soon.");
            setFormData({
                name: "",
                email: "",
                message: "",
            });
        }, 1500);
    };

    return (
        <div className="mx-auto w-full max-w-7xl p-5">
            <h1 className="text-3xl font-bold text-center">Contact Us</h1>

            <p className="text-xl mt-4 text-center">
                We're here to help! Whether you have questions or feedback, feel free to get in touch.
            </p>

            <div className="mt-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-lg font-semibold">
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-lg font-semibold">
                            Your Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-lg font-semibold">
                            Your Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Send Message
                        </button>
                    </div>
                </form>

                {status && (
                    <div className="mt-6 text-center text-lg font-semibold text-green-500">
                        {status}
                    </div>
                )}
            </div>

            <div className="mt-20 text-center">
                <h2 className="text-2xl font-semibold">Other Ways to Reach Us</h2>
                <p className="mt-2 text-lg">
                    You can also connect with us on social media or by email for quicker support.
                </p>

                <div className="mt-6 space-x-6">
                    <a
                        href="https://twitter.com/yourprofile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 transition duration-300"
                    >
                        Twitter
                    </a>
                    <a
                        href="https://github.com/yourprofile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-800 hover:text-gray-700 transition duration-300"
                    >
                        GitHub
                    </a>
                    <a
                        href="mailto:youremail@example.com"
                        className="text-blue-500 hover:text-blue-600 transition duration-300"
                    >
                        Email Us
                    </a>
                </div>
            </div>
        </div>
    );
}

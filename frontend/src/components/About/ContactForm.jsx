'use client';

import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PhoneCodeSelect } from '../common/PhoneCodeSelect';

export const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneCode: '+971',
        phoneNumber: '',
        description: '',
    });

    const [loading, setLoading] = useState(false); // ✅ added

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, phoneCode, phoneNumber, description } = formData;
        const fullPhone = phoneCode + phoneNumber;

        if (!name || !email || !phoneNumber) {
            toast.error("Please fill in Name, Email and Phone.");
            return;
        }

        try {
            setLoading(true); // ✅ disable button

            const response = await fetch('/api/usercontact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    phone: fullPhone,
                    description
                }),
            });


            const result = await response.json();

            if (response.ok) {
                toast.success(`Thank you, ${formData.name}! We have received your message.`);
                setFormData({
                    name: '',
                    email: '',
                    phoneCode: '+971',
                    phoneNumber: '',
                    description: '',
                });
            } else {
                toast.error(result.error || 'Something went wrong.');
            }
        } catch (error) {
            toast.error('Failed to send message. Please try again later.');
            console.error(error);
        } finally {
            setLoading(false); // ✅ re-enable button
        }
    };

    return (
        <div className="bg-[#0E293E] rounded-xl h-auto p-6 px-4 shadow-md md:max-w-md md:ml-auto">
            <ToastContainer />
            <h3 className="text-xl font-semibold mb-2 text-white">Get In Touch</h3>
            <p className="text-sm text-gray-400 mb-6">We’ll get back to you shortly.</p>

            <form className="space-y-4 w-full" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full h-[45px] p-3 rounded-md border border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email ID"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full h-[45px] p-3 rounded-md border border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                />

                <div className="flex w-full">
                    <PhoneCodeSelect value={formData.phoneCode} onChange={handleChange} />

                    <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Mobile Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="flex-1 w-[90%] h-[45px] p-3 rounded-r-md border border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                    />
                </div>

                <textarea
                    rows={3}
                    name="description"
                    placeholder="Enter any description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full h-[100px] p-3 rounded-md border border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                ></textarea>
                <p className="text-[12px] md:text-[13px] text-[#999] italic max-w-md leading-relaxed">
                    <span className="font-bold not-italic">Disclaimer:</span> By submitting this form, you consent to Wall Street Jr. Investments using your information in line with our Privacy Policy. We do not request funds via website forms - all client accounts remain with licensed custodians.
                </p>
                <button
                    type="submit"
                    disabled={loading} // ✅ disable while loading
                    className={`w-full h-[42px] py-2 rounded-md bg-gradient-to-r from-[#FBAA4E] to-[#0075B7] text-white font-semibold ${loading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
                        }`}
                >
                    {loading ? 'Sending...' : 'Send Message'} {/* ✅ change text */}
                </button>
            </form>
        </div>
    );
};

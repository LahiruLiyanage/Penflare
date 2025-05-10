'use client';

import React from 'react';
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe, Send, ArrowRight } from "lucide-react";

export default function Contact() {
    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    // Contact information
    const contactInfo = [
        {
            icon: <Mail className="text-sky-600" size={24} />,
            title: "Email",
            details: "lhlahiru95@gmail.com",
            link: "mailto:lhlahiru95@gmail.com"
        },
        {
            icon: <Globe className="text-sky-600" size={24} />,
            title: "Website",
            details: "www.lahiruliyanage.com",
            link: "https://www.lahiruliyanage.com"
        },
        {
            icon: <Phone className="text-sky-600" size={24} />,
            title: "Phone",
            details: "+94 71 960 7296",
            link: "tel:+94719607296"
        },
        {
            icon: <MapPin className="text-sky-600" size={24} />,
            title: "Location",
            details: "Colombo, Sri Lanka",
            link: "#"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
            {/* Hero Section */}
            <section className="pt-24 pb-16 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="max-w-3xl mx-auto text-center"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                    >
                        <div className="inline-flex items-center px-4 py-2 bg-sky-100 rounded-full text-sm font-medium mb-6">
                            <Mail className="text-sky-600 mr-2" size={14} />
                            <span className="text-sky-800">Get In Touch</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                            Contact <span className="text-sky-600">Us</span>
                        </h1>

                        <p className="text-lg text-gray-600 mb-8">
                            Have questions or want to connect? We'd love to hear from you.
                            Reach out using any of the methods below.
                        </p>
                    </motion.div>
                </div>

                {/* Decorative elements */}
                <motion.div
                    className="absolute top-20 left-1/4 w-48 h-48 rounded-full bg-sky-200 opacity-20 blur-3xl"
                    animate={{
                        x: [0, 10, 0],
                        y: [0, 15, 0]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 8,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-0 right-1/4 w-60 h-60 rounded-full bg-sky-300 opacity-10 blur-3xl"
                    animate={{
                        x: [0, -15, 0],
                        y: [0, -10, 0]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 10,
                        ease: "easeInOut"
                    }}
                />
            </section>

            {/* Contact Information Cards */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {contactInfo.map((item, index) => (
                            <motion.a
                                key={index}
                                href={item.link}
                                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-sky-100 flex flex-col items-center text-center"
                                variants={fadeIn}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            >
                                <div className="bg-sky-50 p-4 rounded-full mb-4">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                                <p className="text-sky-600">{item.details}</p>
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            className="bg-white rounded-2xl shadow-xl p-8 border border-sky-100"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Send a Message</h2>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                                        placeholder="What is this regarding?"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        id="message"
                                        rows={6}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                                        placeholder="Your message..."
                                    ></textarea>
                                </div>

                                <motion.button
                                    type="submit"
                                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-sky-600 to-sky-800 text-white font-medium py-3 px-6 rounded-lg hover:opacity-95"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Send size={18} className="mr-2" />
                                    Send Message
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-b from-sky-50 to-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="bg-gradient-to-br from-sky-600 to-sky-800 rounded-2xl p-8 text-center shadow-xl relative overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="max-w-2xl mx-auto relative z-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Let's work together
                            </h2>
                            <p className="text-sky-100 mb-8">
                                Looking for a collaboration opportunity? Connect with us today.
                            </p>
                            <motion.a
                                href="#"
                                className="inline-block bg-white text-sky-700 hover:bg-sky-50 py-3 px-8 rounded-full font-medium"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View Portfolio <ArrowRight className="inline ml-2" size={16} />
                            </motion.a>
                        </div>

                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-sky-300 opacity-20 blur-3xl transform -translate-x-1/3 translate-y-1/3" />
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
'use client';

import { motion } from "framer-motion";
import { Feather, Users, Globe, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function About() {
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

    // Team members data
    const teamMembers = [
        {
            name: "Alex Morgan",
            role: "Founder & CEO",
            bio: "Former editor with a passion for making writing accessible to everyone."
        },
        {
            name: "Jamie Chen",
            role: "Head of Design",
            bio: "UX specialist focused on creating beautiful, intuitive interfaces."
        },
        {
            name: "Sam Taylor",
            role: "Content Director",
            bio: "Award-winning writer helping creators tell their stories effectively."
        }
    ];

    // Milestones data
    const milestones = [
        {
            year: "2021",
            title: "Penflare Founded",
            description: "Started with a mission to create the most writer-friendly platform."
        },
        {
            year: "2022",
            title: "10,000 Writers",
            description: "Reached our first major community milestone with global writers."
        },
        {
            year: "2023",
            title: "Mobile App Launch",
            description: "Expanded our platform to iOS and Android devices."
        },
        {
            year: "2024",
            title: "New Editor 2.0",
            description: "Released our revolutionary distraction-free writing experience."
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
                            <Feather className="text-sky-600 mr-2" size={14} />
                            <span className="text-sky-800">Our Story</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                            About <span className="text-sky-600">Penflare</span>
                        </h1>

                        <p className="text-lg text-gray-600 mb-8">
                            We're building the most intuitive platform for writers and readers to connect through meaningful content.
                            Our mission is to empower voices and ideas that deserve to be heard.
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

            {/* Mission & Values */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid {/*md:grid-cols-2*/} gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="relative rounded-2xl overflow-hidden shadow-xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-sky-900/60 to-transparent flex items-end">
                                <div className="p-6 text-white">
                                    <div className="inline-flex items-center px-3 py-1 bg-sky-600 rounded-full text-sm font-medium mb-2">
                                        <Feather size={12} className="mr-1" />
                                        <span>Est. 2021</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission & Values</h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-sky-600 mb-2">Empowering Writers</h3>
                                    <p className="text-gray-600">
                                        We believe everyone has stories worth sharing. Our platform is designed to remove technical barriers and let writers focus on what they do best — creating content that matters.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-sky-600 mb-2">Building Community</h3>
                                    <p className="text-gray-600">
                                        Writing shouldn't be a solitary experience. Penflare connects creators with readers who appreciate their perspective, fostering meaningful dialogue and growth.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-sky-600 mb-2">Accessible Excellence</h3>
                                    <p className="text-gray-600">
                                        Great tools shouldn't be complicated. We strive to make professional publishing features accessible to everyone, regardless of technical expertise.
                                    </p>
                                </div>
                            </div>
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
                                Ready to join our community?
                            </h2>
                            <p className="text-sky-100 mb-8">
                                Start sharing your stories with readers around the world today.
                            </p>
                            <motion.a
                                href="/blog/post/insert"
                                className="inline-block bg-white text-sky-700 hover:bg-sky-50 py-3 px-8 rounded-full font-medium"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Start Writing <ArrowRight className="inline ml-2" size={16} />
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
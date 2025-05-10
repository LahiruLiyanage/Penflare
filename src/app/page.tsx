'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PenLine, BookOpen, Share2 } from "lucide-react";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const features = [
    {
      icon: <PenLine className="text-sky-500" />,
      title: "Write",
      description: "Express your thoughts with our intuitive editor"
    },
    {
      icon: <BookOpen className="text-sky-500" />,
      title: "Read",
      description: "Discover content that inspires and informs"
    },
    {
      icon: <Share2 className="text-sky-500" />,
      title: "Share",
      description: "Connect with readers around the world"
    }
  ];

  return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-sky-50 overflow-hidden relative">
        {/* Decorative elements - responsive adjustments */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-sky-600 clip-diagonal z-0 hidden md:block" />
        <div className="absolute top-0 right-0 w-full h-64 bg-sky-600 md:hidden z-0" />

        <div className="absolute top-20 left-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-sky-200 opacity-70" />
        <div className="absolute bottom-20 right-10 w-16 h-16 md:w-24 md:h-24 rounded-full bg-sky-300 opacity-50" />
        <div className="absolute top-1/3 right-1/4 w-8 h-8 md:w-12 md:h-12 rounded-full bg-sky-100 opacity-60" />

        <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
          <motion.div
              className="flex flex-col items-center mb-8 md:mb-16"
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
          >
            <span className="px-4 py-1 bg-sky-100 text-sky-800 rounded-full text-sm font-medium mb-3 md:mb-4">Introducing Penflare</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-gray-800 mb-4 md:mb-6 px-2">
              Where <span className="text-sky-600">Ideas</span> Take Flight
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl text-center mb-6 md:mb-8 px-4">
              Your space to read, write, and share articles on topics that inspire.
              Discover insightful content or publish your own with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                  href="/blog/posts"
                  className="bg-sky-600 hover:bg-sky-700 text-white py-3 px-8 rounded-lg font-medium flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
              >
                Explore Blog
              </motion.a>
              <motion.a
                  href="/signup"
                  className="border-2 border-sky-600 text-sky-600 hover:bg-sky-50 py-3 px-8 rounded-lg font-medium flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.a>
            </div>
          </motion.div>

          <motion.div
              className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 md:mb-20"
              initial={{ opacity: 0, y: 40 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="relative w-full max-w-5xl mx-auto">
              {/* Desktop image */}
              <div className="hidden md:block relative">
                <Image
                    src="/image-desktop.jpeg"
                    width={1024}
                    height={415}
                    className="w-full rounded-lg object-cover"
                    alt="Penflare blog platform preview - desktop version"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg" />
              </div>

              {/* Mobile image */}
              <div className="md:hidden relative">
                <Image
                    src="/image-mobile.jpeg"
                    width={1536}
                    height={1025}
                    className="w-full rounded-lg object-cover"
                    alt="Penflare blog platform preview - mobile version"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg" />
              </div>
            </div>
          </motion.div>

          <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto px-2"
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={staggerChildren}
          >
            {features.map((feature, index) => (
                <motion.div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    variants={fadeIn}
                    whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-sky-100 rounded-lg mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
            ))}
          </motion.div>

          <motion.div
              className="mt-20 text-center"
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.8 }}
          >
            <p className="text-gray-500">Join thousands of writers and readers on Penflare today</p>
          </motion.div>
        </div>

        <style jsx>{`
        .clip-diagonal {
          clip-path: polygon(100% 0, 100% 100%, 20% 100%);
        }
      `}</style>
      </main>
  );
}
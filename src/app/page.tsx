'use client';

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PenLine, BookOpen, Share2, ChevronDown, X, Menu } from "lucide-react";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();

  // Parallax effect for hero section
  const heroY = useTransform(scrollY, [0, 300], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  useEffect(() => {
    setIsLoaded(true);

    // Handle body scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

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
      icon: <PenLine className="text-sky-500" size={24} />,
      title: "Write",
      description: "Express your thoughts with our intuitive editor"
    },
    {
      icon: <BookOpen className="text-sky-500" size={24} />,
      title: "Read",
      description: "Discover content that inspires and informs"
    },
    {
      icon: <Share2 className="text-sky-500" size={24} />,
      title: "Share",
      description: "Connect with readers around the world"
    }
  ];

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
      <div className="min-h-screen overflow-x-hidden font-sans bg-gradient-to-br from-gray-50 to-sky-50">
        {/* Mobile Navigation Menu */}
        <motion.div
            className={`fixed inset-0 bg-sky-900 z-50 flex flex-col items-center justify-center ${isMenuOpen ? 'block' : 'hidden'}`}
            initial={{ x: '100%' }}
            animate={{ x: isMenuOpen ? 0 : '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
        >
          <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 text-white"
              aria-label="Close menu"
          >
            <X size={32} />
          </button>
          <nav className="flex flex-col items-center space-y-8">
            <a href="/" className="text-white text-2xl font-medium hover:text-sky-200 transition-colors">Home</a>
            <a href="/blog/posts" className="text-white text-2xl font-medium hover:text-sky-200 transition-colors">Blog</a>
            <a href="/blog/about" className="text-white text-2xl font-medium hover:text-sky-200 transition-colors">About</a>
            <a href="/blog/contact" className="text-white text-2xl font-medium hover:text-sky-200 transition-colors">Contact</a>
          </nav>
          <div className="mt-12 flex flex-col space-y-4">
            <motion.a
                href="/login"
                className="bg-white text-sky-800 py-3 px-8 rounded-lg font-medium flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
              Log In
            </motion.a>
            <motion.a
                href="/blog/post/insert"
                className="border-2 border-white text-white py-3 px-8 rounded-lg font-medium flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.a>
          </div>
        </motion.div>

        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <motion.a
                  href="/"
                  className="flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
              >
                <span className="text-sky-700 text-xl font-bold">Penflare</span>
              </motion.a>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <nav className="flex items-center space-x-6">
                  <a href="/blog/posts" className="text-gray-700 hover:text-sky-600 transition-colors">Blog</a>
                  <a href="/blog/about" className="text-gray-700 hover:text-sky-600 transition-colors">About</a>
                  <a href="/blog/contact" className="text-gray-700 hover:text-sky-600 transition-colors">Contact</a>
                </nav>
                <div className="flex items-center space-x-3">
                  <a href="/login" className="text-sky-600 hover:text-sky-700 transition-colors">Log In</a>
                  <motion.a
                      href="/blog/post/insert"
                      className="bg-sky-600 hover:bg-sky-700 text-white py-2 px-4 rounded-lg font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                  </motion.a>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                  className="block md:hidden text-gray-700"
                  onClick={() => setIsMenuOpen(true)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  aria-label="Open menu"
              >
                <Menu size={24} />
              </motion.button>
            </div>
          </div>
        </header>

        <main className="pt-16">
          {/* Hero Section with parallax effect */}
          <motion.section
              ref={heroRef}
              className="relative flex flex-col items-center min-h-screen"
              style={{ y: heroY, opacity: heroOpacity }}
          >
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Dynamic gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-white" />

              {/* Animated decorative elements */}
              <motion.div
                  className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-sky-200 opacity-30 blur-3xl"
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
                  className="absolute bottom-32 right-1/4 w-80 h-80 rounded-full bg-sky-300 opacity-20 blur-3xl"
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
              <motion.div
                  className="absolute top-1/2 left-3/4 w-40 h-40 rounded-full bg-sky-400 opacity-10 blur-2xl"
                  animate={{
                    x: [0, -10, 0],
                    y: [0, 10, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut"
                  }}
              />
            </div>

            <div className="container mx-auto px-4 pt-16 md:pt-24 lg:pt-32 relative z-10">
              <motion.div
                  className="flex flex-col items-center text-center max-w-4xl mx-auto"
                  initial="hidden"
                  animate={isLoaded ? "visible" : "hidden"}
                  variants={fadeIn}
              >
                <motion.span
                    className="px-4 py-1 bg-sky-100 text-sky-800 rounded-full text-sm font-medium mb-6"
                    whileHover={{ y: -3 }}
                >
                  Introducing Penflare
                </motion.span>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
                  Where <span className="text-sky-600 relative">
                  Ideas
                  <motion.svg
                      className="absolute -bottom-1 left-0 w-full h-2 text-sky-400"
                      viewBox="0 0 100 15"
                      preserveAspectRatio="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.5, duration: 1 }}
                  >
                    <motion.path
                        d="M0,5 Q25,0 50,5 T100,5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeLinecap="round"
                    />
                  </motion.svg>
                </span> Take Flight
                </h1>

                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8 md:mb-10">
                  Your space to read, write, and share articles on topics that inspire.
                  Discover insightful content or publish your own with ease.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <motion.a
                      href="/blog/posts"
                      className="bg-sky-600 hover:bg-sky-700 text-white py-3 px-8 rounded-lg font-medium flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                  >
                    Explore Blog
                  </motion.a>
                  <motion.a
                      href="/blog/post/insert"
                      className="border-2 border-sky-600 text-sky-600 hover:bg-sky-50 py-3 px-8 rounded-lg font-medium flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                  </motion.a>
                </div>

                <motion.button
                    onClick={scrollToFeatures}
                    className="mt-16 text-gray-500 hover:text-sky-600 transition-colors flex flex-col items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    aria-label="Scroll down"
                >
                  <span className="mb-2 text-sm">Discover More</span>
                  <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ChevronDown size={24} />
                  </motion.div>
                </motion.button>
              </motion.div>
            </div>
          </motion.section>

          {/* Preview Image Section */}
          <section className="relative py-16 md:py-24">
            <div className="container mx-auto px-4">
              <motion.div
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
              >
                <div className="aspect-video relative">
                  <Image
                      src="/image-desktop.jpeg"
                      alt="Penflare blog platform preview"
                      fill
                      className="object-cover"
                      priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Floating browser UI frame to make it look like a screenshot */}
                  <div className="absolute top-0 left-0 right-0 h-8 bg-gray-100 rounded-t-lg flex items-center px-3 space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <div className="ml-4 h-4 w-1/2 bg-gray-200 rounded" />
                  </div>
                </div>
              </motion.div>

              {/* Mobile Preview (smaller, floating) */}
              <motion.div
                  className="hidden md:block absolute right-12 bottom-0 w-1/4 translate-y-1/4 rounded-2xl overflow-hidden shadow-2xl border-8 border-white"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.7 }}
              >
                <div className="aspect-[9/16] relative">
                  <Image
                      src="/image-mobile.jpeg"
                      alt="Penflare mobile app preview"
                      fill
                      className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-16 md:py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-100 to-white" />

            {/* Decorative elements */}
            <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-sky-100 opacity-50 blur-xl" />
            <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-sky-50 opacity-60 blur-xl" />

            <div className="container mx-auto px-4">
              <motion.div
                  className="text-center mb-12 md:mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose Penflare</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Everything you need to create and share your ideas with the world
                </p>
              </motion.div>

              <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerChildren}
              >
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                        variants={fadeIn}
                        whileHover={{ y: -5 }}
                    >
                      <div className="w-14 h-14 flex items-center justify-center bg-sky-100 rounded-xl mb-6">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="relative py-20 md:py-32 bg-gradient-to-br from-sky-600 to-sky-800 overflow-hidden">
            {/* Decorative light circles */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-white opacity-10 blur-3xl" />

            <div className="container mx-auto px-4">
              <motion.div
                  className="flex flex-col items-center text-center max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Join thousands of writers and readers on Penflare today
                </h2>
                <p className="text-lg text-sky-100 mb-8">
                  Start creating and sharing your own stories, connect with like-minded individuals,
                  and explore a world of inspiring content.
                </p>
                <motion.a
                    href="/signup"
                    className="bg-white text-sky-700 hover:bg-sky-50 py-3 px-8 rounded-lg font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                  Create Your Free Account
                </motion.a>
              </motion.div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <a href="/" className="text-xl font-bold mb-4 block">Penflare</a>
                <p className="text-gray-400 mb-4">Your space to read, write, and share ideas that matter.</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <span className="sr-only">Facebook</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <span className="sr-only">Instagram</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 3.988-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-3.988-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Navigation</h3>
                <ul className="space-y-2">
                  <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                  <li><a href="/blog/posts" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                  <li><a href="/blog/about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                  <li><a href="/blog/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
                <p className="text-gray-400 mb-4">Get the latest posts delivered to your inbox.</p>
                <form className="flex">
                  <input
                      type="email"
                      placeholder="Your email"
                      className="px-4 py-2 w-full rounded-l-lg focus:outline-none text-gray-800"
                  />
                  <button
                      type="submit"
                      className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-r-lg transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
              <p>&copy; {new Date().getFullYear()} Penflare. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
  );
}
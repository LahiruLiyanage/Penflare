'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { PenLine, BookOpen, Share2, ChevronDown, X, Menu, ArrowRight, Feather } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const { scrollY } = useScroll();

  const showSubHeader = useTransform(scrollY, [100, 200], [0, 1]);
  const heroY = useTransform(scrollY, [0, 300], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const features = [
    {
      icon: <PenLine className="text-sky-500" size={24} />,
      title: "Write with Ease",
      description: "An intuitive editor that makes writing a joy, not a chore"
    },
    {
      icon: <BookOpen className="text-sky-500" size={24} />,
      title: "Read Anywhere",
      description: "Discover content that inspires and informs, on any device"
    },
    {
      icon: <Share2 className="text-sky-500" size={24} />,
      title: "Share Globally",
      description: "Connect with readers around the world with just a click"
    }
  ];

  const navItems = [
    { href: "/blog/posts", label: "Blog" },
    { href: "/crs", label: "CRS" },
    { href: "/blog/about", label: "About" },
    { href: "/blog/contact", label: "Contact" }
  ];

  useEffect(() => {
    setIsLoaded(true);

    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);

    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
      clearInterval(featureInterval);
    };
  }, [isMenuOpen, features.length]);

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
      <div className="min-h-screen overflow-x-hidden font-sans">
        <AnimatePresence>
          {isMenuOpen && (
              <motion.div
                  className="fixed inset-0 bg-gradient-to-br from-sky-800 to-sky-900 z-50 flex flex-col items-center justify-center"
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 20 }}
              >
                <motion.button
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-6 right-6 text-white"
                    whileHover={{ rotate: 90 }}
                    aria-label="Close menu"
                >
                  <X size={28} />
                </motion.button>
                <motion.nav
                    className="flex flex-col items-center space-y-8"
                    initial="hidden"
                    animate="visible"
                    variants={staggerChildren}
                >
                  {[{ href: "/", label: "Home" }, ...navItems].map((item, i) => (
                      <motion.div key={i} variants={fadeIn} whileHover={{ x: 5 }}>
                        <Link
                            href={item.href}
                            className="text-white text-2xl font-medium hover:text-sky-200 transition-colors"
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                  ))}
                  <motion.div variants={fadeIn}>
                    <Link
                        href="/blog/post/insert"
                        className="bg-white text-sky-800 py-3 px-8 rounded-full font-medium flex items-center justify-center mt-4"
                    >
                      <motion.span
                          className="flex items-center"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                      >
                        Start Writing <ArrowRight className="ml-2" size={18} />
                      </motion.span>
                    </Link>
                  </motion.div>
                </motion.nav>
              </motion.div>
          )}
        </AnimatePresence>

        <header className="fixed top-0 left-0 right-0 z-40 bg-white bg-opacity-95 shadow-sm">
          <motion.div
              className="container mx-auto px-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex justify-between items-center py-4">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link href="/" className="flex items-center">
                  <Feather className="text-sky-600 mr-2" size={24} />
                  <span className="text-sky-700 text-xl font-bold">Penflare</span>
                </Link>
              </motion.div>

              <div className="hidden md:flex items-center space-x-8">
                <nav className="flex items-center space-x-6">
                  {navItems.map((item, i) => (
                      <Link key={i} href={item.href} className="text-gray-700 hover:text-sky-600 transition-colors">
                        {item.label}
                      </Link>
                  ))}
                </nav>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                      href="/blog/post/insert"
                      className="bg-sky-600 hover:bg-sky-700 text-white py-2 px-6 rounded-full font-medium flex items-center"
                  >
                    Get Started <ArrowRight className="ml-2" size={16} />
                  </Link>
                </motion.div>
              </div>

              <motion.button
                  className="block md:hidden text-gray-700"
                  onClick={() => setIsMenuOpen(true)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Open menu"
              >
                <Menu size={24} />
              </motion.button>
            </div>
          </motion.div>
        </header>

        <motion.div
            className="fixed top-16 left-0 right-0 z-30 bg-sky-600 text-white py-2 shadow-md"
            style={{ opacity: showSubHeader }}
        >
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Feather size={16} />
              <span className="text-sm font-medium">Discover the power of Penflare</span>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                  href="/blog/post/insert"
                  className="text-xs bg-white text-sky-600 px-3 py-1 rounded-full font-medium"
              >
                Write Now
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <main className="pt-16">
          <motion.section
              className="relative py-12 md:py-20 flex flex-col items-center min-h-[85vh] md:min-h-screen"
              style={{ y: heroY, opacity: heroOpacity }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-white" />

            <div className="container mx-auto px-4 pt-12 md:pt-24 relative z-10">
              <motion.div
                  className="flex flex-col items-center text-center max-w-4xl mx-auto"
                  initial="hidden"
                  animate={isLoaded ? "visible" : "hidden"}
                  variants={fadeIn}
              >
                <motion.div
                    className="flex items-center px-4 py-2 bg-sky-100 rounded-full text-sm font-medium mb-6"
                    whileHover={{ y: -3 }}
                    animate={{ scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 2 } }}
                >
                <span className="bg-sky-600 text-white p-1 rounded-full mr-2">
                  <Feather size={12} />
                </span>
                  <span className="text-sky-800">Introducing Penflare</span>
                </motion.div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                  Where <span className="text-sky-600 relative inline-block">
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

                <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
                  Your space to read, write, and share articles on topics that inspire.
                  Discover insightful content or publish your own with ease.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                        href="/blog/posts"
                        className="bg-sky-600 hover:bg-sky-700 text-white py-3 px-8 rounded-full font-medium flex items-center justify-center"
                    >
                      Explore Blog
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                        href="/blog/post/insert"
                        className="border-2 border-sky-600 text-sky-600 hover:bg-sky-50 py-3 px-8 rounded-full font-medium flex items-center justify-center"
                    >
                      Start Writing
                    </Link>
                  </motion.div>
                </div>

                <motion.button
                    onClick={scrollToFeatures}
                    className="mt-12 text-gray-500 hover:text-sky-600 transition-colors flex flex-col items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    aria-label="Scroll down"
                >
                  <span className="mb-2 text-sm">Discover More</span>
                  <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    <ChevronDown size={24} />
                  </motion.div>
                </motion.button>
              </motion.div>
            </div>
          </motion.section>

          <section id="features" className="py-16 md:py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4">
              <motion.div
                  className="text-center mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose Penflare</h2>
                <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                  Everything you need to create and share your ideas with the world
                </p>
              </motion.div>

              <div className="md:hidden">
                <motion.div
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-50 to-white shadow-lg p-6 mb-8 h-64"
                    key={activeFeature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                >
                  <div className="w-14 h-14 flex items-center justify-center bg-sky-100 rounded-xl mb-4">
                    {features[activeFeature].icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{features[activeFeature].title}</h3>
                  <p className="text-gray-600">{features[activeFeature].description}</p>

                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                    {features.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveFeature(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                                index === activeFeature ? 'bg-sky-500' : 'bg-gray-300'
                            }`}
                            aria-label={`View feature ${index + 1}`}
                        />
                    ))}
                  </div>
                </motion.div>
              </div>

              <motion.div
                  className="hidden md:grid grid-cols-3 gap-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerChildren}
              >
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="bg-gradient-to-br from-sky-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
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

          <section className="py-16 md:py-20 bg-gradient-to-b from-white to-sky-50">
            <div className="container mx-auto px-4">
              <motion.div
                  className="bg-gradient-to-br from-sky-600 to-sky-800 rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between relative z-10">
                  <div className="mb-6 md:mb-0 md:mr-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      Ready to share your stories?
                    </h2>
                    <p className="text-sky-100">
                      Join thousands of writers on Penflare and be part of a growing community.
                    </p>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                        href="/blog/post/insert"
                        className="bg-white text-sky-700 hover:bg-sky-50 py-3 px-8 rounded-full font-medium whitespace-nowrap flex items-center justify-center"
                    >
                      Start Writing Now <ArrowRight className="ml-2" size={18} />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <footer className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
              <div className="md:w-1/3">
                <Link href="/" className="text-xl font-bold mb-2 flex items-center">
                  <Feather className="text-sky-400 mr-2" size={20} />
                  <span>Penflare</span>
                </Link>
                <p className="text-gray-400 mb-3 text-sm">Your space to read, write, and share ideas that matter.</p>
                <div className="flex space-x-4">
                  {['Twitter', 'Facebook', 'Instagram'].map((social, i) => (
                      <a key={i} href="#" className="text-gray-400 hover:text-white transition-colors">
                        <span className="sr-only">{social}</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                  ))}
                </div>
              </div>

              <div className="md:w-1/3">
                <h3 className="text-lg font-semibold mb-3">Navigation</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
                  {navItems.map((item, i) => (
                      <Link key={i} href={item.href} className="text-gray-400 hover:text-white transition-colors">
                        {item.label}
                      </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-4 text-center text-xs text-gray-500">
              <p>&copy; {new Date().getFullYear()} Penflare. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
  );
}
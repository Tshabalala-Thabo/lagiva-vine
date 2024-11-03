import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Wine, Leaf, UserCheck, Truck, Facebook, Phone, Mail, MessageCircle, X, ChevronLeft, ChevronRight } from "lucide-react";
import { BrandTiktok } from 'tabler-icons-react';
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useMediaQuery } from 'react-responsive';
import happyClients from '../data/happyClients.js'; // Import happy clients data
import heroImages from '../data/heroImages.js'; // Import hero images data
import SkeletonLoader from '../components/SkeletonLoader'; // Import SkeletonLoader
import useProducts from '../hooks/useProducts'; // Import the custom hook

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedWine, setSelectedWine] = useState(null);
  const wineGridRef = useRef(null);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const { products: displayedWines, isLoading } = useProducts(); // Use the custom hook

  const categories = ["All", ...new Set(displayedWines.map(wine => wine.type))];

  const filteredWines = selectedCategory === "All"
    ? displayedWines
    : displayedWines.filter(wine => wine.type === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.5, ease: 'easeInOut' }
    },
    exit: {
      opacity: 0,
      transition: { duration: 1.5, ease: 'easeInOut' }
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const [slideDirection, setSlideDirection] = useState(0);

  const nextTestimonial = () => {
    setSlideDirection(1);
    setCurrentTestimonial((prev) => (prev + 1) % happyClients.length);
  };

  const prevTestimonial = () => {
    setSlideDirection(-1);
    setCurrentTestimonial((prev) => (prev - 1 + happyClients.length) % happyClients.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <main className="flex-grow">
        <section
          className="w-full bg-black text-white py-20 relative overflow-hidden"
          style={{ height: '600px' }}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentHeroImage}
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${heroImages[currentHeroImage]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
            <div className="flex flex-col items-start md:w-5/12">
              <h1 
                className={`text-4xl font-bold mb-4 font-frank-ruhl transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              >
                Discover Exquisite Wines
              </h1>
              <p 
                className={`text-xl text-gray-300 mb-8 transition-opacity duration-1000 ease-in-out delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              >
                Indulge in our carefully curated selection of fine wines.
              </p>
              <Link 
                to="/explore" 
                className={`text-primary px-6 py-2 border border-primary rounded-sm text-lg font-semibold hover:bg-opacity-90 transition-all duration-1000 ease-in-out delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                Explore Our Collection
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full bg-black bg-cover bg-no-repeat py-12 relative" style={{ backgroundImage: "url('/assets/section/overview.jpg')" }}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="container mx-auto px-4 py-8 rounded-sm relative z-10">
            <h2 className="text-3xl font-bold text-center mb-12 font-frank-ruhl text-white">Why Choose Our Wines?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<Wine className="w-10 h-10 text-primary" />}
                title="Exceptional Quality"
                description="Carefully crafted wines from the finest handpicked grapes worldwide."
                index={0}
              />
              <FeatureCard
                icon={<Leaf className="w-10 h-10 text-primary" />}
                title="Sustainable Practices"
                description="Environmentally-friendly production methods to ensure a greener future."
                index={1}
              />
              <FeatureCard
                icon={<UserCheck className="w-10 h-10 text-primary" />}
                title="Expert Curation"
                description="Exclusive selections made by experienced sommeliers for every wine lover."
                index={2}
              />
              <FeatureCard
                icon={<Truck className="w-10 h-10 text-primary" />}
                title="Delivery"
                description="We deliver our premium wines directly to your doorstep."
                index={3}
              />
            </div>
          </div>
        </section>

        <section className="w-full bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 font-frank-ruhl text-primary">Featured Wines</h2>
            <div className="flex justify-center mb-8 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-300 ease-in-out ${selectedCategory === category ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
                    } rounded-sm mr-2 mb-2`}
                >
                  {category}
                </button>
              ))}
            </div>
            {isLoading ? ( // Show loading state
              <SkeletonLoader /> // Use SkeletonLoader while loading
            ) : (
              <motion.div
                ref={wineGridRef}
                className="flex flex-wrap justify-center gap-4 sm:gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence>
                  {filteredWines.map((wine) => (
                    <motion.div
                      key={wine._id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      layout
                      className="rounded-sm overflow-hidden cursor-pointer w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)] max-w-xs"
                      onClick={() => navigate(`/product/${wine._id}`)}
                    >
                      <div className="relative bg-stale w-full pt-[125%]">
                        <img
                          src={wine.imageUrl} // Use the imageUrl from the fetched product
                          alt={wine.name}
                          className="absolute inset-0 w-full h-full object-contain p-4"
                        />
                        <div className="absolute top-2 left-2 bg-gray-300 text-gray-800 text-xs px-2 py-1 rounded-sm">
                          {wine.type}
                        </div>
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="text-sm sm:text-base font-frank-ruhl font-semibold truncate">{wine.name}</h3>
                        <p className="text-sm sm:text-base font-semibold mt-0">R{wine.price.toFixed(2)}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </section>

        <section className="w-full bg-stale py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 font-frank-ruhl text-primary">Our Happy Clients</h2>
            {isMobile ? (
              <div className="relative h-[400px]"> {/* Fixed height container */}
                <div className="absolute inset-0 overflow-hidden">
                  <AnimatePresence initial={false} custom={slideDirection} mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      custom={slideDirection}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <ClientTestimonial client={happyClients[currentTestimonial]} index={currentTestimonial} />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <button
                  onClick={prevTestimonial}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
                >
                  <ChevronRight size={24} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 flex justify-center mt-4">
                  {happyClients.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSlideDirection(index > currentTestimonial ? 1 : -1);
                        setCurrentTestimonial(index);
                      }}
                      className={`h-2 w-2 rounded-full mx-1 ${index === currentTestimonial ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {happyClients.map((client, index) => (
                  <ClientTestimonial key={index} client={client} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="w-full bg-cover bg-center py-16 relative" style={{ backgroundImage: "url('/images/contact.jpeg')" }}>
          <div className="absolute inset-0 bg-black opacity-70"></div>
          <div className="container mx-auto px-4 md:text-center relative z-10">
            <h2 className="text-3xl font-bold text-center mb-12 font-frank-ruhl text-white">Connect with Us</h2>
            <div className="md:flex md:justify-center gap-8 space-y-6 md:space-y-0">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Social Media</h3>
                <div className="space-y-2 flex flex-col md:items-center">
                  <a href="https://www.tiktok.com/@wineelegance" target="_blank" rel="noopener noreferrer" className="text-white flex hover:text-primary transition-colors">
                    <BrandTiktok size={26} /> lagivavinery
                  </a>
                  <a href="https://www.facebook.com/wineelegance" target="_blank" rel="noopener noreferrer" className="text-white flex hover:text-primary transition-colors">
                    <Facebook size={26} /> lagivavinery
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Contact Us</h3>
                <ul className="space-y-2 flex flex-col md:items-center">
                  <li className="flex items-center">
                    <MessageCircle size={24} className="mr-2 text-white" />
                    <a href="https://wa.me/27814498919" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors">081 449 8919</a>
                  </li>
                  <li className="flex items-center">
                    <Phone size={24} className="mr-2 text-white" />
                    <a href="tel:+27814498919" className="text-white hover:text-primary transition-colors">081 449 8919</a>
                  </li>
                  <li className="flex items-center">
                    <Mail size={24} className="mr-2 text-white" />
                    <a href="mailto:admin@lagivavinery.co.za" className="text-white hover:text-primary transition-colors">admin@lagivavinery.com</a>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selectedWine && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedWine(null)}
          >
            <motion.div
              className="bg-white rounded-sm p-6 max-w-lg w-full"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold font-frank-ruhl">{selectedWine.name}</h2>
                <button onClick={() => setSelectedWine(null)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <div className="w-full h-64 relative mb-4">
                <img
                  src={selectedWine.imageUrl}
                  alt={selectedWine.name}
                  className="absolute inset-0 w-full h-full object-contain rounded-sm"
                />
              </div>
              <p className="text-gray-600 mb-2">{selectedWine.type}</p>
              <p className="text-xl font-semibold mb-4">R{selectedWine.price.toFixed(2)}</p>
              <p className="text-gray-700">{selectedWine.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function ClientTestimonial({ client, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="w-40 h-40 rounded-sm overflow-hidden mb-4">
        <img
          src={client.image}
          alt={`${client.name}, a happy client`}
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2 font-frank-ruhl">{client.name}</h3>
      <p className="text-gray-600 italic">&ldquo;{client.quote}&rdquo;</p>
    </motion.div>
  );
}

function FeatureCard({ icon, title, description, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="bg-[#282828] rounded-sm shadow-md   p-6 h-full"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2 text-center">{title}</h3>
      <p className="text-gray-300 text-center">{description}</p>
    </motion.div>
  );
}

export default Home;
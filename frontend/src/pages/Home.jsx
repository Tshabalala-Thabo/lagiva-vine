import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Wine, Leaf, UserCheck, Truck, Facebook, Phone, Mail, MessageCircle, X } from "lucide-react";
import { BrandTiktok } from 'tabler-icons-react';
import { motion, AnimatePresence, useInView } from "framer-motion";

const wines = [
  { id: 1, name: "MCC Brut Blanc DE Noir", type: "Sparkling", price: 178.00, image: "./assets/wine/mcc_brut_blanc_de_noi.png", description: "A crisp and elegant sparkling wine with notes of citrus and brioche." },
  { id: 2, name: "Syrah", type: "Red", price: 157.00, image: "./assets/wine/syrah.png", description: "A bold and spicy red wine with flavors of blackberry and pepper." },
  { id: 3, name: "Sauvignon Blanc", type: "White", price: 110.00, image: "./assets/wine/sauvignon_blanc.png", description: "A refreshing white wine with vibrant notes of grapefruit and green apple." },
  { id: 4, name: "Pinot Noir", type: "Red-Dry", price: 244.00, image: "./assets/wine/pinot_noir.png", description: "A delicate red wine with aromas of cherry and earthy undertones." },
  { id: 5, name: "Merlot", type: "Red", price: 110.00, image: "./assets/wine/merlot.png", description: "A smooth red wine with flavors of plum and chocolate." },
  { id: 6, name: "Cabernet Sauvignon", type: "Red", price: 110.00, image: "./assets/wine/cabernet_sauvignon.png", description: "A full-bodied red wine with rich flavors of blackcurrant and oak." },
  { id: 7, name: "Chardonnay", type: "White", price: 110.00, image: "./assets/wine/chardonnay.png", description: "A buttery white wine with notes of vanilla and tropical fruits." },
  { id: 14, name: "Sweet Red", type: "Sweet", price: 110.00, image: "./assets/wine/sweet_red.png", description: "A luscious sweet red wine with flavors of ripe berries and a smooth finish." },
  { id: 15, name: "Custom", type: "Custom", price: 200.00, image: "./assets/wine/custom.png", description: "A unique blend crafted to your specific taste preferences." },
];

const happyClients = [
  { name: "Sarah", image: "/placeholder.svg?height=300&width=300", quote: "The perfect wine for every occasion!" },
  { name: "John", image: "/placeholder.svg?height=300&width=300", quote: "Exceptional selection and service." },
  { name: "Emma", image: "/placeholder.svg?height=300&width=300", quote: "My go-to place for fine wines." },
  { name: "Michael", image: "/placeholder.svg?height=300&width=300", quote: "Knowledgeable staff and great recommendations." },
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [displayedWines, setDisplayedWines] = useState(wines);
  const [selectedWine, setSelectedWine] = useState(null);
  const wineGridRef = useRef(null);

  const categories = ["All", ...new Set(wines.map(wine => wine.type))];

  useEffect(() => {
    const filteredWines = selectedCategory === "All" 
      ? wines 
      : wines.filter(wine => wine.type === selectedCategory);
    
    setDisplayedWines(filteredWines);
  }, [selectedCategory]);

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

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <main className="flex-grow">
        <section className="w-full bg-gradient-to-r from-primary to-primary-foreground text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4 font-serif">Discover Exquisite Wines</h1>
            <p className="text-xl mb-8">Indulge in our carefully curated selection of fine wines from around the world.</p>
            <button className="bg-white text-primary px-6 py-2 rounded-md text-lg font-semibold hover:bg-opacity-90 transition-colors duration-300">
              Explore Our Collection
            </button>
          </div>
        </section>

        <section className="w-full bg-gradient-to-r from-amber-50 to-red-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 font-serif text-primary">Why Choose Our Wines?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<Wine className="w-10 h-10 text-red-600" />}
                title="Exceptional Quality"
                description="Carefully crafted wines from the finest handpicked grapes worldwide."
                index={0}
              />
              <FeatureCard
                icon={<Leaf className="w-10 h-10 text-green-600" />}
                title="Sustainable Practices"
                description="Environmentally-friendly production methods to ensure a greener future."
                index={1}
              />
              <FeatureCard
                icon={<UserCheck className="w-10 h-10 text-blue-600" />}
                title="Expert Curation"
                description="Exclusive selections made by experienced sommeliers for every wine lover."
                index={2}
              />
              <FeatureCard
                icon={<Truck className="w-10 h-10 text-purple-600" />}
                title="Worldwide Delivery"
                description="Delivering premium wines globally, directly to your doorstep."
                index={3}
              />
            </div>
          </div>
        </section>

        <section className="w-full bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 font-serif text-primary">Featured Wines</h2>
            <div className="flex justify-center mb-8 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-300 ease-in-out ${
                    selectedCategory === category ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
                  } rounded-md mr-2 mb-2`}
                >
                  {category}
                </button>
              ))}
            </div>
            <motion.div 
              ref={wineGridRef}
              className="flex flex-wrap justify-center gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {displayedWines.map((wine) => (
                  <motion.div
                    key={wine.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    layout
                    className="bg-white rounded-lg shadow-md overflow-hidden w-full sm:w-64 md:w-72 lg:w-80 cursor-pointer"
                    onClick={() => setSelectedWine(wine)}
                  >
                    <div className="relative w-full" style={{ paddingBottom: "106.67%" }}>
                      <img 
                        src={wine.image} 
                        alt={wine.name} 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-serif font-semibold truncate">{wine.name}</h3>
                      <p className="text-sm text-gray-600 truncate">{wine.type}</p>
                      <p className="text-lg font-semibold mt-2">R{wine.price.toFixed(2)}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        <section className="w-full bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 font-serif text-primary">Our Happy Clients</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {happyClients.map((client, index) => (
                <ClientTestimonial key={index} client={client} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="w-full bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 font-serif text-primary">Connect with Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Social Media</h3>
                <div className="flex space-x-4">
                  <a href="https://www.tiktok.com/@wineelegance" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary transition-colors">
                    <BrandTiktok size={24} />
                  </a>
                  <a href="https://www.facebook.com/wineelegance" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-primary transition-colors">
                    <Facebook size={24} />
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <MessageCircle size={20} className="mr-2 text-primary" />
                    <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WhatsApp: +1 (234) 567-890</a>
                  </li>
                  <li className="flex items-center">
                    <Mail size={20} className="mr-2 text-primary" />
                    <a href="mailto:info@wineelegance.com" className="hover:text-primary transition-colors">info@wineelegance.com</a>
                  </li>
                  <li className="flex items-center">
                    <Phone size={20} className="mr-2 text-primary" />
                    <a href="tel:+12345678901" className="hover:text-primary transition-colors">+1 (234) 567-8901</a>
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
              className="bg-white rounded-lg p-6 max-w-lg w-full"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold font-serif">{selectedWine.name}</h2>
                <button onClick={() => setSelectedWine(null)} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>
              <img 
                src={selectedWine.image} 
                alt={selectedWine.name} 
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
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
      <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
        <img 
          src={client.image} 
          alt={`${client.name}, a happy client`} 
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2 font-serif">{client.name}</h3>
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
      className="bg-white rounded-lg shadow-lg p-6 h-full"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </motion.div>
  );
}

export default Home;
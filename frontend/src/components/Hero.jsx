import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ hero }) => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-lavender via-dusty-pink to-rose text-white">
      {/* Animated Stars Background Placeholder */}
      <div className="absolute inset-0 z-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      
      <div className="z-10 text-center flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-script text-4xl md:text-6xl mb-4 text-shadow-soft"
        >
          {hero?.title || "Hi My Love"}
        </motion.h2>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-heading text-5xl md:text-7xl font-bold max-w-3xl px-4 text-shadow-soft"
        >
          {hero?.subtitle || "This website exists because I love you."}
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 flex flex-col items-center"
        >
          <span className="font-body text-sm tracking-widest uppercase mb-2">
            {hero?.scrollText || "Scroll Slowly"}
          </span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 h-8 rounded-full bg-white/50"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

import React from 'react';
import { motion } from 'framer-motion';

const LoveReasons = ({ data }) => {
  if (!data || data.length === 0) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-24 px-4 bg-white relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl text-lavender font-bold mb-4">
            Things I Love About You
          </h2>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {data.map((reason, index) => (
            <motion.div 
              key={index}
              variants={item}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(244, 194, 215, 0.4)" }}
              className="bg-slate-50 rounded-2xl p-6 shadow-md transition-all border border-pink-50"
            >
              <div className="text-4xl mb-4">{reason.emoji || "❤️"}</div>
              <h3 className="font-heading text-xl font-bold text-gray-800 mb-2">{reason.title}</h3>
              <p className="font-body text-gray-600">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LoveReasons;

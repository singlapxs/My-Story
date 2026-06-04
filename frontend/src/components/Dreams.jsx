import React from 'react';
import { motion } from 'framer-motion';

const Dreams = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-slate-50 to-pink-50 relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-lavender/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl text-lavender font-bold mb-4">
            Our Future Dreams
          </h2>
          <p className="font-script text-2xl text-rose">
            Everything I want to do with you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((dream, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-lavender to-rose rounded-full flex items-center justify-center text-3xl mb-6 shadow-inner mx-auto md:mx-0">
                {dream.icon || "✨"}
              </div>
              <h3 className="font-heading text-xl font-bold text-gray-800 mb-2 text-center md:text-left">{dream.title}</h3>
              <p className="font-body text-gray-600 text-center md:text-left leading-relaxed">
                {dream.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dreams;

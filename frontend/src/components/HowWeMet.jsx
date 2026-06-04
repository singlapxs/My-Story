import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const HowWeMet = ({ data }) => {
  if (!data) return null;

  return (
    <section className="py-24 px-4 bg-slate-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading text-4xl md:text-5xl text-lavender font-bold mb-4">
            {data.title || "How We Met"}
          </h2>
          <h3 className="font-script text-2xl md:text-3xl text-rose mb-8">
            {data.subtitle || "Our beautiful beginning"}
          </h3>
          
          <div className="flex justify-center items-center mb-8 gap-4 opacity-70">
            <div className="h-[1px] w-16 bg-dusty-pink"></div>
            <FaHeart className="text-dusty-pink" />
            <div className="h-[1px] w-16 bg-dusty-pink"></div>
          </div>

          <p className="font-body text-lg leading-relaxed text-gray-700 whitespace-pre-wrap">
            {data.content || "It all started when..."}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowWeMet;

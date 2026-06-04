import React from 'react';
import { motion } from 'framer-motion';

const FinalLetter = ({ data }) => {
  if (!data) return null;

  return (
    <section className="py-32 px-4 bg-slate-900 text-slate-100 relative overflow-hidden flex items-center justify-center min-h-screen">
      {/* Dark romantic background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-lavender/20 rounded-full blur-[100px]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5 }}
        className="max-w-2xl w-full z-10"
      >
        <div className="bg-[#fdfbf7] p-8 md:p-16 rounded-sm shadow-2xl relative text-gray-800"
             style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}>
          
          <h2 className="font-heading text-4xl mb-8 text-center border-b border-gray-300 pb-6 text-gray-900">
            {data.title || "My Vows"}
          </h2>
          
          <div className="font-script text-2xl md:text-3xl leading-loose tracking-wide whitespace-pre-wrap mb-12 opacity-90">
            {data.content || "I promise to love you forever."}
          </div>
          
          <div className="text-right font-script text-3xl md:text-4xl text-rose mt-8">
            {data.signature || "Yours forever,"}
          </div>
        </div>

        <div className="text-center mt-24 opacity-50 font-body text-sm tracking-[0.3em] uppercase">
          The end is just the beginning.
        </div>
      </motion.div>
    </section>
  );
};

export default FinalLetter;

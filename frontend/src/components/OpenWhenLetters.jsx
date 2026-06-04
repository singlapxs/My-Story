import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaEnvelopeOpenText, FaTimes } from 'react-icons/fa';

const OpenWhenLetters = ({ data }) => {
  const [selectedLetter, setSelectedLetter] = useState(null);

  if (!data || data.length === 0) return null;

  return (
    <section className="py-24 px-4 bg-slate-50 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl text-lavender font-bold mb-4">
            Open When...
          </h2>
          <p className="font-script text-2xl text-rose">
            Letters for every moment
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((letter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => setSelectedLetter(letter)}
              className="bg-white p-6 rounded-xl shadow-md border-2 border-dashed border-pink-200 cursor-pointer flex flex-col items-center justify-center text-center group hover:border-pink-400 hover:shadow-lg transition-all"
            >
              <div className="text-4xl text-dusty-pink group-hover:text-rose transition-colors mb-4">
                <FaEnvelope />
              </div>
              <h3 className="font-heading font-bold text-gray-800 text-lg">
                {letter.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-[#fdfbf7] w-full max-w-2xl rounded-sm shadow-2xl relative overflow-hidden"
              style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}
            >
              {/* Envelope Flap Decoration */}
              <div className="absolute top-0 left-0 w-full h-8 bg-dusty-pink/20 border-b border-dashed border-dusty-pink/40"></div>
              
              <button 
                onClick={() => setSelectedLetter(null)}
                className="absolute top-10 right-4 p-2 text-gray-400 hover:text-gray-800 transition-colors focus:outline-none"
              >
                <FaTimes size={20} />
              </button>

              <div className="p-10 pt-16 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-center mb-8 text-rose text-3xl">
                  <FaEnvelopeOpenText />
                </div>
                <h3 className="font-heading text-3xl font-bold text-center mb-8 text-gray-800 border-b pb-4">
                  {selectedLetter.title}
                </h3>
                <div className="font-body text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                  {selectedLetter.content}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OpenWhenLetters;

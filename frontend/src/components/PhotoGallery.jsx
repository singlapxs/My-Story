import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PhotoGallery = ({ data }) => {
  const [selectedImg, setSelectedImg] = useState(null);

  if (!data || data.length === 0) return null;

  return (
    <section className="py-24 px-4 bg-white relative">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-heading text-4xl md:text-5xl text-lavender font-bold mb-16">
          Our Precious Moments
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ rotate: Math.random() * 4 - 2, scale: 1.05 }}
              className="bg-white p-3 pb-8 rounded shadow-lg border border-gray-200 cursor-pointer"
              onClick={() => setSelectedImg(photo)}
            >
              <img 
                src={photo.url} 
                alt={photo.caption || "Memory"} 
                className="w-full h-64 object-cover rounded"
              />
              <p className="font-script text-xl mt-4 text-gray-700">
                {photo.caption || "Our moment"}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center p-4 cursor-pointer"
          >
            <motion.img 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImg.url} 
              alt={selectedImg.caption} 
              className="max-w-full max-h-[80vh] object-contain rounded"
            />
            {selectedImg.caption && (
              <p className="text-white font-script text-3xl mt-4">
                {selectedImg.caption}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoGallery;

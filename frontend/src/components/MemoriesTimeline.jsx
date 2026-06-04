import React from 'react';
import { motion } from 'framer-motion';

const MemoriesTimeline = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <section className="py-24 px-4 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center font-heading text-4xl md:text-5xl text-lavender font-bold mb-16">
          Our Favorite Memories
        </h2>
        
        <div className="relative border-l-4 border-dusty-pink/30 ml-4 md:ml-1/2 md:left-1/2 md:-translate-x-1/2 space-y-12">
          {data.map((memory, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`relative flex flex-col md:flex-row items-center justify-between w-full
                ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-12px] md:left-1/2 md:-translate-x-[14px] w-6 h-6 rounded-full bg-rose border-4 border-white shadow-md z-10"></div>
              
              {/* Content Box */}
              <div className={`w-full md:w-5/12 ml-6 md:ml-0 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                <div className="bg-white p-6 rounded-2xl shadow-md border border-pink-50 hover:shadow-lg transition-shadow">
                  <span className="font-script text-rose text-xl mb-2 block">
                    {new Date(memory.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-gray-800 mb-3">{memory.title}</h3>
                  <p className="font-body text-gray-600 mb-4">{memory.description}</p>
                  {memory.image && (
                    <img 
                      src={memory.image} 
                      alt={memory.title} 
                      className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => window.open(memory.image, '_blank')}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemoriesTimeline;

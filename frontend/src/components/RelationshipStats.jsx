import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const StatCounter = ({ label, value, delay }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value, 10) || 0;
    if (start === end) return;

    let totalMilSecDur = 2000;
    let incrementTime = (totalMilSecDur / end) * 10;
    if (incrementTime > 50) incrementTime = 50;

    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMilSecDur / incrementTime));
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center justify-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg border border-white"
    >
      <div className="text-4xl md:text-5xl font-heading font-bold text-rose mb-2">
        {count}
      </div>
      <div className="text-gray-600 font-body uppercase tracking-wider text-sm font-semibold">
        {label}
      </div>
    </motion.div>
  );
};

const RelationshipStats = ({ data }) => {
  if (!data) return null;

  const calculateDaysTogether = (startDate) => {
    if (!startDate) return 0;
    const start = new Date(startDate);
    const today = new Date();
    const diffTime = Math.abs(today - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysTogether = calculateDaysTogether(data.startDate);

  return (
    <section className="py-24 px-4 bg-gradient-to-r from-dusty-pink/30 to-lavender/30 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCounter label="Days Together" value={daysTogether} delay={0.1} />
          <StatCounter label="Photos Shared" value={data.photosShared || 0} delay={0.2} />
          <StatCounter label="I Love Yous" value={9999} delay={0.4} /> {/* Easter egg/fun stat */}
        </div>
      </div>
    </section>
  );
};

export default RelationshipStats;

const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  hero: {
    title: { type: String, default: "Hi My Love" },
    subtitle: { type: String, default: "This website exists because I love you." },
    scrollText: { type: String, default: "Scroll Slowly" }
  },
  howWeMet: {
    title: { type: String, default: "How We Met" },
    subtitle: { type: String, default: "Our beautiful beginning" },
    content: { type: String, default: "It all started when..." }
  },
  loveReasons: [{
    title: String,
    description: String,
    emoji: String
  }],
  memories: [{
    title: String,
    date: Date,
    description: String,
    image: String
  }],
  gallery: [{
    url: String,
    caption: String
  }],
  dreams: [{
    title: String,
    description: String,
    icon: String
  }],
  letters: [{
    title: String,
    content: String
  }],
  stats: {
    startDate: { type: Date, default: Date.now },
    photosShared: { type: Number, default: 0 },
    memoriesMade: { type: Number, default: 0 }
  },
  finalLetter: {
    title: { type: String, default: "My Vows" },
    content: { type: String, default: "I promise to..." },
    signature: { type: String, default: "Yours forever," }
  },
  music: {
    url: String,
    title: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);

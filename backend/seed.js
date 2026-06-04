require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Content = require('./models/Content');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://singlapulkit1103_db_user:pulkit2005@cluster0.wnxge8t.mongodb.net/');
    console.log('MongoDB Connected for seeding');

    // Create Admin User
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@mystory.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'password123';

    const existingUser = await User.findOne({ email: adminEmail });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await User.create({
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });
      console.log(`Admin user created: ${adminEmail}`);
    } else {
      console.log('Admin user already exists');
    }

    // Create Default Content
    const existingContent = await Content.findOne();
    if (!existingContent) {
      await Content.create({});
      console.log('Default content created');
    } else {
      console.log('Content already exists');
    }

    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
